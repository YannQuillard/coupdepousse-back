import { Body, Controller, Delete, Get, Param, Post, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateUserTasksDto } from './dto/create-userTask.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

/**
 * Créer une nouvelle tâche
 * Update une tâche
 * Validé un freeworker
 * Prendre la tâche d'un senior
 * Récuperer une tâche
 */
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Post('/')
  create(@Body() createUserTasksDto: CreateUserTasksDto) {
    return this.tasksService.createTaskUser(createUserTasksDto);
  }


  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}