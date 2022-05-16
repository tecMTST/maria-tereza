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

    // @Put()
    // update(@Body() updateUserDto: UpdateUserDto) {
    //   return this.UsersService.update(updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.UsersService.deleteById(id);
    // }
}
