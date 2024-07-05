import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags("Categories")
export class CategoriesController {
    constructor (
        private categoriesService: CategoriesService
    ) {}

    @Get("")
    @ApiOperation({
        summary: "Get all categories",
        description: "A method to get all categories of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns all categories",
        type: [CategoryDto]
    })
    async findAll(): Promise<CategoryDto[]> {
        return await this.categoriesService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get definite category by unique identifier",
        description: "A method to get definite category by unique identifier"
    })
    @ApiResponse({
        status: 200,
        description: "Returns definite category",
        type: CategoryDto
    })
    async findOneById(@Param("id") id: number): Promise<CategoryDto> {
        return await this.categoriesService.findOneById(id);
    }

    @Post("")
    @ApiOperation({
        summary: "Create category",
        description: "A method to create category of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns created category",
        type: CategoryDto
    })
    async create(@Body() data: CreateCategoryDto): Promise<CategoryDto> {
        return await this.categoriesService.create(data);
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Update category parameters",
        description: "A method to update category parameters of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns updated category",
        type: CategoryDto
    })
    async update(@Param("id") id: number, @Body() data: CreateCategoryDto): Promise<CategoryDto> {
        return await this.categoriesService.update(id, data);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete definite category",
        description: "A method to delete definite category of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns deleted category",
        type: CategoryDto
    })
    async delete(@Param("id") id: number): Promise<CategoryDto> {
        return await this.categoriesService.delete(Number(id));
    }
}
