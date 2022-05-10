import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoObjectIdPipe) id: string) {
    return this.messagesService.findById(id);
  }

  // @Put()
  // update(@Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messagesService.deleteById(id);
  // }
}
