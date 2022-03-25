import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateUserTasksDto } from './dto/create-userTask.dto';
import { Task } from './task.model';
import { TaskUser } from './taskUser.model';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private readonly tasksRepository: typeof Task,
        @Inject('TASKS_USER_REPOSITORY')
        private readonly tasksUserRepository: typeof TaskUser,


        private readonly userService: UsersService,
    ) {}

    async createTask(createtaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.create(createtaskDto);
    }

    async createTaskUser(createUserTasksDto: CreateUserTasksDto) {
        const user = await this.userService.findOne(createUserTasksDto.userId.toString());
        const task = await this.findOne(createUserTasksDto.taskId.toString());

        if(user && task) {
            return await this.tasksUserRepository.create(createUserTasksDto);
        }
        else {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }

    async returnTaskByUserId(userId: number) {
        return this.tasksUserRepository.findAll({
            where: {
                userId,
            },
        });
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.findAll();
    }

    async findOne(id: string): Promise<Task> {
        
        return await this.tasksRepository.findOne({
            where: {
                id,
            },
        });
    }

    async findOneTask(id: number) {
        return await this.tasksUserRepository.findOne({
            where: {
                id,
            },
        });
    }


    async update(id: number, createUserTasksDto: CreateUserTasksDto) {
        const response = await this.findOneTask(id);

        if (!response) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }
        response.userId = createUserTasksDto.userId || response.userId
        response.freeworkerId = createUserTasksDto.freeworkerId || response.freeworkerId
        response.taskId = createUserTasksDto.taskId || response.taskId
        response.validationSeniorId = createUserTasksDto.validationSeniorId || response.validationSeniorId
        response.validationFreeworkerId = createUserTasksDto.validationFreeworkerId || response.validationFreeworkerId
        response.description = createUserTasksDto.description || response.description
        response.datetime = createUserTasksDto.datetime || response.datetime

        try {
            return await response.save(); 
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async remove(id: string): Promise<void> {
        const task = await this.findOne(id);
        await task.destroy()
    }
}