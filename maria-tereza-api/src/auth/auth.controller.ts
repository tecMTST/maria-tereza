import { Request } from 'express';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() param: { email: string, passwd: string }) {
        return this.authService.login(param.email, param.passwd);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    logout(@Req() req: Request) {
        const { user } = req
        return this.authService.logout(user['email']);
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request) {
        const { user } = req
        return this.authService.refreshToken(user['email'], user['refreshToken']);
    }
}
