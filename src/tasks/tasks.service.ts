import { Injectable, Inject } from '@nestjs/common';
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

        if(user) {
            return await this.tasksUserRepository.create(createUserTasksDto);
        }
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.findAll();
    }

    findOne(id: string): Promise<Task> {
        return this.tasksRepository.findOne({
            where: {
                id,
            },
        });
    }

    async remove(id: string): Promise<void> {
        const task = await this.findOne(id);
        await task.destroy()
    }
}