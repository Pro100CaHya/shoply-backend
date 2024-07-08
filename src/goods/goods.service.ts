import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoodDto } from './dto/good.dto';
import { CreateGoodDto } from './dto/create-good.dto';

@Injectable()
export class GoodsService {
    constructor(
        private prisma: PrismaService
    ) {}

    async findAll(): Promise<any> {
        return await this.prisma.good.findMany();
    }

    async findOneById(id: number): Promise<GoodDto> {
        const good = await this.prisma.good.findUnique({
            where: {
                id
            }
        });

        if (!good) {
            throw new NotFoundException(`Good with ID ${id} not found`);
        } 

        return good;
    }

    async create(data: CreateGoodDto): Promise<GoodDto> {
        return await this.prisma.good.create({
            data
        });
    }

    async update(id: number, data: Partial<CreateGoodDto>): Promise<GoodDto> {
        const good = await this.findOneById(id);

        if (!good) {
            throw new NotFoundException(`Good with ID ${id} not found`);
        }

        return await this.prisma.good.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: number): Promise<GoodDto> {
        const good = await this.findOneById(id);

        if (!good) {
            throw new NotFoundException(`Good with ID ${id} not found`);
        }

        return await this.prisma.good.delete({
            where: {
                id
            }    
        });
    }
}
