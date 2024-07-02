import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { UserByIdNotFoundException } from './exceptions/user-by-id-not-found.exception';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) {}

    async findAll(): Promise<UserDto[]> {
        return await this.prisma.user.findMany();
    }

    async findOneById(id: number): Promise<UserDto> {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async findOneByEmail(email: string): Promise<UserDto> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
        }
        return user;
    }

    async create(data: CreateUserDto): Promise<UserDto> {
        const user = await this.findOneByEmail(data.email);

        if (user) {
            throw new UserAlreadyExistsException(data.email);
        }

        return await this.prisma.user.create({ data });
    }

    async update(id: number, data: Partial<CreateUserDto>): Promise<UserDto> {
        const user = await this.findOneById(id);

        if (!user) {
            throw new UserByIdNotFoundException(id);
        }

        return await this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: number): Promise<UserDto> {
        const user = await this.findOneById(id);

        if (!user) {
            throw new UserByIdNotFoundException(id);
        }

        return await this.prisma.user.delete({
            where: {
                id
            }    
        });
    }
}
