import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';
import { UserByIdNotFoundException } from './exceptions/user-by-id-not-found.exception';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) {}

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOneById(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async findOneByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
        }
        return user;
    }

    async create(data: CreateUserDto) {
        const user = await this.findOneByEmail(data.email);

        if (user) {
            throw new UserAlreadyExistsException(data.email);
        }

        return await this.prisma.user.create({ data });
    }

    async update(id: number, data: Partial<CreateUserDto>) {
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

    async delete(id: number) {
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
