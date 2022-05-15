import { Request } from 'express';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseMongoObjectIdPipe) id: string) {
        return this.usersService.findById(id);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() param: { email: string, passwd: string }) {
        return this.usersService.login(param.email, param.passwd);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    logout(@Req() req: Request) {
        const { user } = req
        return this.usersService.logout(user['email']);
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request) {
        const { user } = req
        return this.usersService.refreshToken(user['email'], user['refreshToken']);
    }

    // @Put()
    // update(@Body() updateUserDto: UpdateUserDto) {
    //   return this.UsersService.update(updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.UsersService.deleteById(id);
    // }
}
