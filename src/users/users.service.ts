import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async create(data: CreateUserDto) {
        return await this.prisma.user.create({ data });
    }

    async update(id: number, data: Partial<CreateUserDto>) {
        return await this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: number) {
        return await this.prisma.user.delete({
            where: {
                id
            }    
        });
    }
}
