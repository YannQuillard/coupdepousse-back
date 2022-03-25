import { Task } from './task.model';
import { TaskUser } from './taskUser.model';

export const tasksProviders = [
  {
    provide: 'TASKS_REPOSITORY',
    useValue: Task,
  },
];

export const tasksUserProviders = [
  {
    provide: 'TASKS_USER_REPOSITORY',
    useValue: TaskUser,
  },
];