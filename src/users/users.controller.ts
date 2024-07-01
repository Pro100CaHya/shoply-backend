import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(":id")
    async findOneById(@Param("id") id: number) {
        return await this.usersService.findOneById(id);
    }

    @Post("find-by-email")
    async findOneByEmail(@Body() email: string) {
        return await this.usersService.findOneByEmail(email);
    }

    @Post()
    async create(@Body() data: CreateUserDto) {
        return await this.usersService.create(data);
    }

    @Patch(":id")
    async update(@Param("id") id: number, @Body() data: Partial<CreateUserDto>) {
        return await this.usersService.update(id, data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return await this.usersService.delete(id);
    }
}
