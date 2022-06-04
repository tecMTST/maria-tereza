import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserFilterController } from 'src/common/controller/user-filter/user-filter.controller';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { UsersService } from '../users/users.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController extends UserFilterController {
  constructor(
    private readonly messagesService: MessagesService,
    usersService: UsersService
  ) {
    super(usersService);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Req() req: Request, @Body() createMessageDto: CreateMessageDto) {
    const { message } = createMessageDto;
    return this.messagesService.create(await this.getUserId(req), { message });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: Request) {
    return this.messagesService.findAll(await this.getUserId(req));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() req: Request, @Param('id', ParseMongoObjectIdPipe) id: string) {
    return this.messagesService.findById(await this.getUserId(req), id);
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async update(@Req() req: Request, @Body() updateMessageDto: UpdateMessageDto) {
    const { _id,message } = updateMessageDto
    return this.messagesService.update(await this.getUserId(req), { _id, message });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async remove(@Req() req: Request, @Param('id') id: string) {
    return this.messagesService.deleteById(await this.getUserId(req) ,id);
  }
}
