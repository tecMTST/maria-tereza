import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ChatModule } from '../chat/chat.module';
import { ContactsModule } from '../contacts/contacts.module';
import { UsersModule } from '../users/users.module';
import { Scheduler, SchedulerSchema } from './entities/scheduler.entity';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(), 
    MongooseModule.forFeature([{ name: Scheduler.name, schema: SchedulerSchema }]), 
    ChatModule,
    ContactsModule,
    UsersModule
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService]
})
export class SchedulerModule { }
