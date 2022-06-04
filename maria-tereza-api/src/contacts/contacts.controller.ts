import { Request } from 'express';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { UsersService } from '../users/users.service';
import { UserFilterController } from 'src/common/controller/user-filter/user-filter.controller';

@Controller('contacts')
export class ContactsController extends UserFilterController {
  constructor(
    private readonly contactsService: ContactsService,
    usersService: UsersService,
  ) {
    super(usersService);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Req() req: Request, @Body() createContactDto: CreateContactDto) {
    const { name, phoneNumber } = createContactDto;
    return this.contactsService.create(await this.getUserId(req), { name, phoneNumber });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: Request) {
    return this.contactsService.findAll(await this.getUserId(req));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() req: Request, @Param('id') id: string) {
    return this.contactsService.findById(await this.getUserId(req), id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Req() req: Request, @Body() updateContactDto: UpdateContactDto) {
    const { _id, name, phoneNumber } = updateContactDto;
    return this.contactsService.update(await this.getUserId(req), { _id, name, phoneNumber });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Req() req: Request, @Param('id') idContact: string) {
    return this.contactsService.deleteById(await this.getUserId(req), idContact);
  }
}
