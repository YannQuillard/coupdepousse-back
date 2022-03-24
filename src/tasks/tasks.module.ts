import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TasksController } from './tasks.controller';
import { tasksProviders, tasksUserProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    ...tasksProviders,
    ...tasksUserProviders,
  ],
})
export class TasksModule {}