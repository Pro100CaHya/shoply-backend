import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessTokenPayloadDto } from './dto/jwt-access-token-payload.dto';
import { JwtRefreshTokenPayloadDto } from './dto/jwt-refresh-token-payload.dto';
import { randomUUID } from 'crypto';
import { UserAlreadyExistsException } from 'src/users/exceptions/user-already-exists.exception';
import { IncorrectLoginOrPassword } from 'src/auth/exceptions/incorrect-login-or-password.exception';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
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

    async login(userData: CreateUserDto) {
        const user = await this.usersService.findOneByEmail(userData.email);

        if (!user) {
            throw new IncorrectLoginOrPassword();
        }

        const isPasswordValid = compareSync(userData.password, user.password);

        if (!isPasswordValid) {
            throw new IncorrectLoginOrPassword();
        }

        return {
            access: {
                token: await this.generateAccessToken({
                    userId: user.id,
                    email: user.email,
                    tokenType: "access",
                    deviceId: randomUUID()
                }),
                expiresIn: "10m"
            },
            refresh: {
                token: await this.generateRefreshToken({
                    userId: user.id,
                    tokenType: "refresh",
                    deviceId: randomUUID()
                }),
                expiresIn: "1d"
            }
        }
    }

    private async generateAccessToken(payload: JwtAccessTokenPayloadDto) {
        return this.jwtService.sign(payload, {
            expiresIn: "10m"
        });
    }

    private async generateRefreshToken(payload: JwtRefreshTokenPayloadDto) {
        return this.jwtService.sign(payload, {
            expiresIn: "1d"
        });
    }
}
