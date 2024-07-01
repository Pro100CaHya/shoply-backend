import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}
    async register(userData: CreateUserDto) {
        const candidate = await this.usersService.findOneByEmail(userData.email);

        if (candidate) {
            throw new Error('User already exists');
        }

        const hashedPassword = hashSync(userData.password, 10);

        const user = this.usersService.create({
            ...userData,
            password: hashedPassword
        });

        return {
            message: "Пользователь зарегистрирован",
            data: {
                ...user
            },
            tokens: {
                accessToken: await this.generateAccessToken(),
                refreshToken: await this.generateRefreshToken()
            }
        }
    }

    private async generateAccessToken() {

    }

    private async generateRefreshToken() {
    }
}
