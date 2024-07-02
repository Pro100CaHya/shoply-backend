import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post("register")
    @ApiOperation({
        summary: "Register new user",
        description: "A method to register new user"
    })
    async register(@Body() userData: CreateUserDto) {
        return await this.authService.register(userData);
    }

    @Post("login")
    @ApiOperation({
        summary: "Login existing user",
        description: "A method to login user to get jwt tokens (access and refresh)"
    })
    async login(@Body() userData: CreateUserDto) {
        return await this.authService.login(userData);
    }
}
