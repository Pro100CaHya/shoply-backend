import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayloadDto } from './dto/jwt-token-payload.dto';
import { UserAlreadyExistsException } from 'src/users/exceptions/user-already-exists.exception';
import { IncorrectLoginOrPassword } from 'src/auth/exceptions/incorrect-login-or-password.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { IncorrectRefreshToken } from './exceptions/incorrect-refresh-token.exception';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private redis: RedisService
    ) { }
    async register(userData: CreateUserDto) {
        const candidate = await this.usersService.findOneByEmail(userData.email);

        if (candidate) {
            throw new UserAlreadyExistsException(userData.email);
        }

        const hashedPassword = hashSync(userData.password, 10);

        const user = await this.usersService.create({
            ...userData,
            password: hashedPassword
        });

        return {
            message: "User registered successfully",
        }
    }

    async login(userData: CreateUserDto, userAgent: string) {
        const user = await this.usersService.findOneByEmail(userData.email);

        if (!user) {
            throw new IncorrectLoginOrPassword();
        }

        const isPasswordValid = compareSync(userData.password, user.password);

        if (!isPasswordValid) {
            throw new IncorrectLoginOrPassword();
        }

        const existedSession = await this.prisma.userSession.findUnique({
            where: {
                userId: user.id,
                userAgent: userAgent
            }
        });

        if (existedSession) {
            await this.prisma.userSession.delete({
                where: {
                    id: existedSession.id
                }
            })
        }

        const accessToken = await this.generateAccessToken({
            userId: user.id,
            email: user.email,
            tokenType: "access",
            userAgent
        });
        const refreshToken = await this.generateRefreshToken({
            userId: user.id,
            tokenType: "refresh",
            userAgent
        });

        await this.prisma.userSession.create({
            data: {
                userAgent,
                refreshToken,
                userId: user.id,
            }
        });

        return {
            access: {
                token: accessToken,
                expiresIn: "10m"
            },
            refresh: {
                token: refreshToken,
                expiresIn: "1d"
            }
        }
    }

    async getTokensByRefresh(refreshToken: string, userAgent: string) {
        const userSession = await this.prisma.userSession.findUnique({
            where: {
                refreshToken
            }
        });

        if (!userSession) {
            throw new IncorrectRefreshToken();
        }

        try {
            const verified = this.jwtService.verify<Omit<JwtTokenPayloadDto, "email">>(refreshToken);

            if (verified.userAgent !== userSession.userAgent) {
                throw new IncorrectRefreshToken();
            }

            await this.prisma.userSession.delete({
                where: {
                    id: userSession.id
                }
            });

            const user = await this.usersService.findOneById(verified.userId);

            const newAccessToken = await this.generateAccessToken({
                userId: user.id,
                email: user.email,
                tokenType: "access",
                userAgent
            });
            const newRefreshToken = await this.generateRefreshToken({
                userId: user.id,
                tokenType: "refresh",
                userAgent
            });

            await this.prisma.userSession.update({
                where: {
                    id: userSession.id
                },
                data: {
                    userAgent,
                    refreshToken: newRefreshToken
                }
            });

            return {
                access: {
                    token: newAccessToken,
                    expiresIn: "10m"
                },
                refresh: {
                    token: newRefreshToken,
                    expiresIn: "1d"
                }
            }
        } catch (error) {
            console.log(error);
            throw new IncorrectRefreshToken();
        }
    }

    private async generateAccessToken(payload: JwtTokenPayloadDto) {
        return this.jwtService.sign(payload, {
            expiresIn: "10m"
        });
    }

    private async generateRefreshToken(payload: Omit<JwtTokenPayloadDto, "email">) {
        return this.jwtService.sign(payload, {
            expiresIn: "1d"
        });
    }

    async logout(userId: number, userAgent: string, accessToken: string) {
        const existedSession = await this.prisma.userSession.findUnique({
            where: {
                userId,
                userAgent
            }
        });

        if (!existedSession) {
            throw new HttpException("User is not logged out", HttpStatus.UNAUTHORIZED);
        }

        await this.prisma.userSession.delete({
            where: {
                id: existedSession.id
            }
        });

        await this.redis.set(accessToken, "deprecated", 3600);
    }
}
