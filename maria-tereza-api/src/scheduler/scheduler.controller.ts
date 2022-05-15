import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ParseMongoObjectIdPipe } from 'src/common/pipes/parse-mongo-object-id.pipe';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { UpdateSchedulerDto } from './dto/update-scheduler.dto';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post()
  create(@Body() createSchedulerDto: CreateSchedulerDto) {
    return this.schedulerService.create(createSchedulerDto);
  }

  @Get()
  findAll() {
    return this.schedulerService.findNextMessage();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoObjectIdPipe) id: string) {
    return this.schedulerService.findById(id);
  }

  @Put()
  update(@Body() updateSchedulerDto: UpdateSchedulerDto) {
    return this.schedulerService.update(updateSchedulerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.schedulerService.deleteById(id);
  // }
}
