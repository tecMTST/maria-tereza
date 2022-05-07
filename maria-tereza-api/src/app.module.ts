import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { ChatModule } from './chat/chat.module';
import { ContactsModule } from './contacts/contacts.module';
import { MessagesModule } from './messages/messages.module';
import { SchedulerModule } from './scheduler/scheduler.module';
@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (service: AppConfigService) => ({
        uri: service.connectionString
      })
    }),
    ChatModule,
    ContactsModule,
    MessagesModule,
    SchedulerModule, 
  ],
})
export class AppModule {
}
