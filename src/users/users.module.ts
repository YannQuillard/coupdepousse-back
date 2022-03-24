import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
  ],
})
export class UsersModule {}