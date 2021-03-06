import { Body, Controller, Delete, Get, Param, Post, Logger, Req } from '@nestjs/common';
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

  @Post()
  create(@Body() createUserTasksDto: CreateUserTasksDto) {
    return this.tasksService.createTaskUser(createUserTasksDto);
  }

  @Post('/update')
  update(@Body() createUserTasksDto: CreateUserTasksDto, @Req() request) {
    return this.tasksService.update(request.body.id, createUserTasksDto);
  }

  
  @Get('/user/:phone')
  returnTaskByUserId(@Param('phone') phone: string) {
    return this.tasksService.returnTaskByUserId(phone);
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
  removeTaskFromUser(@Param('id') id: number): Promise<void> {
    return this.tasksService.removeTaskFromUser(id);
  }
}