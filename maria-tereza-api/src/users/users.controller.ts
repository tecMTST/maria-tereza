import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UsePipes(ValidationPipe)
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
    login(@Body() param: { email: string,passwd: string }) {
        return this.usersService.login(param.email, param.passwd);
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
