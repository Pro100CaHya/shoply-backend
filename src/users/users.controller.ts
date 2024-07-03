import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@ApiTags("Users")
@ApiBearerAuth()
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    @ApiOperation({
        summary: "Get all users",
        description: "A method to get all users of the service"
    })
    @ApiResponse({
        status: 200,
        description: "Returns all users",
        type: [UserDto]
    })
    @UseGuards(AuthGuard)
    async findAll() {
        return await this.usersService.findAll();
    }

    @ApiOperation({
        summary: "Get user by unique identifier",
        description: "A method to get user by unique identifier"
    })
    @ApiResponse({
        status: 200,
        description: "Returns user by unique identifier",
        type: UserDto
    })
    @Get(":id")
    async findOneById(@Param("id") id: number) {
        return await this.usersService.findOneById(id);
    }

    @ApiOperation({
        summary: "Get user by email",
        description: "A method to get user by email"
    })
    @ApiResponse({
        status: 200,
        description: "Returns user by email",
        type: UserDto
    })
    @Post("find-by-email")
    async findOneByEmail(@Body() email: string) {
        return await this.usersService.findOneByEmail(email);
    }

    @ApiOperation({
        summary: "Create User",
        description: "A method to create user"
    })
    @ApiResponse({
        status: 200,
        description: "Create user in service",
        type: UserDto
    })
    @Post()
    async create(@Body() data: CreateUserDto) {
        return await this.usersService.create(data);
    }

    @ApiOperation({
        summary: "Update User",
        description: "A method to update the existing user"
    })
    @ApiResponse({
        status: 200,
        description: "Update the existing user",
        type: UserDto
    })
    @Patch(":id")
    async update(@Param("id") id: number, @Body() data: Partial<CreateUserDto>) {
        return await this.usersService.update(id, data);
    }

    @ApiOperation({
        summary: "Delete User",
        description: "A method to delete the existing user"
    })
    @ApiResponse({
        status: 200,
        description: "Delete the existing user",
        type: UserDto
    })
    @Delete(":id")
    async delete(@Param("id") id: number) {
        return await this.usersService.delete(Number(id));
    }
}
