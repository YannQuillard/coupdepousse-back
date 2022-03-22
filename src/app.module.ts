import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TwilioModule } from './twilio_sms/twilio_sms.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    TwilioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
