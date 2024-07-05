import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        private prisma: PrismaService
    ) {}

    async findAll(): Promise<CategoryDto[]> {
        return await this.prisma.category.findMany();
    }

    async findOneById(id: number): Promise<CategoryDto> {
        return await this.prisma.category.findUnique({
            where: {
                id
            }
        });
    }

    async create(data: CreateCategoryDto): Promise<CategoryDto> {
        return await this.prisma.category.create({ data });
    }

    async update(id: number, data: CreateCategoryDto): Promise<CategoryDto> {
        const user = await this.findOneById(id);

        if (!user) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return await this.prisma.category.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: number): Promise<CategoryDto> {
        const user = await this.findOneById(id);

        if (!user) {
            throw new NotFoundException(id);
        }

        return await this.prisma.category.delete({
            where: {
                id
            }    
        });
    }
}
