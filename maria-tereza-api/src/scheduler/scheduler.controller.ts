import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserFilterController } from 'src/common/controller/user-filter/user-filter.controller';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { UsersService } from 'src/users/users.service';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { UpdateSchedulerDto } from './dto/update-scheduler.dto';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController extends UserFilterController {
  constructor(
    private readonly schedulerService: SchedulerService,
    usersService: UsersService
  ) {
    super(usersService);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Req() req: Request, @Body() createSchedulerDto: CreateSchedulerDto) {
    const { message, sendToContact, when } = createSchedulerDto;
    return this.schedulerService.create(await this.getUserId(req), { message, sendToContact, when });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req: Request) {
    return this.schedulerService.findAll(await this.getUserId(req));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() req: Request, @Param('id', ParseMongoObjectIdPipe) id: string) {
    return this.schedulerService.findById(await this.getUserId(req), id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Req() req: Request, @Body() updateSchedulerDto: UpdateSchedulerDto) {
    const { _id, message, sendToContact, when } = updateSchedulerDto;
    return this.schedulerService.update(await this.getUserId(req), { _id, message, sendToContact, when });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async remove(@Req() req: Request, @Param('id') id: string) {
    return this.schedulerService.deleteById(await this.getUserId(req), id);
  }
}
