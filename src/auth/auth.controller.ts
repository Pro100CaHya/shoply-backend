import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetNewTokensDto } from './dto/get-new-tokens.dto';
import { RequestWithJwtPayload } from './interfaces/request-with-jwt-payload.interface';
import { AuthGuard } from './auth.guard';

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

    @Post("refresh")
    @ApiOperation({
        summary: "Get new access and refresh tokens",
        description: "A method to get new tokens' pair by existing refresh token"
    })
    async refresh(@Body() tokenDto: GetNewTokensDto) {
        return await this.authService.getTokensByRefresh(tokenDto.refreshToken);
    }

    @Get("logout")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Logout existing user",
        description: "A method to logout existing user and block current session (access and refresh tokens)"
    })
    @ApiBearerAuth()
    async logout(@Req() req: RequestWithJwtPayload) {
        return await this.authService.logout(req.payload.userId, req.payload.deviceId);
    }
}
