import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ContactsModule } from './contacts/contacts.module';
import { MessagesModule } from './messages/messages.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { UsersModule } from './users/users.module';
import { UserFilterMongoService } from './common/services/user-filter-mongo/user-filter-mongo.service';
import { UserFilterController } from './common/controller/user-filter/user-filter.controller';
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
    UsersModule,
    AuthModule,
  ]
})
export class AppModule {
}
