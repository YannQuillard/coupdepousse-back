import { Sequelize } from 'sequelize-typescript';
import { Token } from 'src/auth/token.model';
import { Task } from 'src/tasks/task.model';
import { TaskUser } from 'src/tasks/taskUser.model';
import { User } from '../users/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
      });
      sequelize.addModels([User, Task, TaskUser, Token]);
      await sequelize.sync();
      return sequelize;
    },
  },
];