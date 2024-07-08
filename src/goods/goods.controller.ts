import { Controller, Get, Post, Patch, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoodsService } from './goods.service';
import { GoodDto } from './dto/good.dto';
import { CreateGoodDto } from './dto/create-good.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('goods')
@ApiTags("Goods")
export class GoodsController {
    constructor(
        private goodsService: GoodsService
    ) {}

    @Get("")
    @ApiOperation({
        summary: "Get all goods",
        description: "A method to get all goods of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns all goods",
        type: [GoodDto]
    })
    async findAll(): Promise<GoodDto[]> {
        return await this.goodsService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Get definite good by unique identifier",
        description: "A method to get definite good by unique identifier"
    })
    @ApiResponse({
        status: 200,
        description: "Returns definite good",
        type: GoodDto
    })
    async findOneById(@Param("id") id: number): Promise<GoodDto> {
        return await this.goodsService.findOneById(id);
    }

    @Post("")
    @UseInterceptors(FileInterceptor("file"))
    @ApiOperation({
        summary: "Create category",
        description: "A method to create category of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns created category",
        type: GoodDto
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "iPhone 13"
                },
                price: {
                    type: "number",
                    example: 100000
                },
                categoryId: {
                    type: "number",
                    example: 1
                },
                file: {
                    type: "string",
                    format: "binary"
                }
            }
        }
    })
    async create(@UploadedFile() file: Express.Multer.File, @Body() data: CreateGoodDto): Promise<GoodDto> {
        return await this.goodsService.create({
            ...data,
            price: Number(data.price),
            categoryId: Number(data.categoryId),
            image: file?.path
        });
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Update category parameters",
        description: "A method to update category parameters of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns updated category",
        type: GoodDto
    })
    async update(@Param("id") id: number, @Body() data: CreateGoodDto): Promise<GoodDto> {
        return await this.goodsService.update(id, data);
    }

    @Delete(":id")
    @ApiOperation({
        summary: "Delete definite category",
        description: "A method to delete definite category of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns deleted category",
        type: GoodDto
    })
    async delete(@Param("id") id: number): Promise<GoodDto> {
        return await this.goodsService.delete(Number(id));
    }
}
