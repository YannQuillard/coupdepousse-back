import { Optional } from 'sequelize';
import { ForeignKey, Column, Model, Table, CreatedAt } from 'sequelize-typescript';
import { User } from '../users/user.model'
import { Task } from './task.model'

interface TaskUserAttributes {
    id: number,
    userId: number,
    taskId: number,
    description: string,
    datetime: Date,
    timestamp: Date
}

interface TaskUserCreationAttributes extends Optional<TaskUserAttributes, 'id'> {}

@Table
export class TaskUser extends Model<TaskUserAttributes, TaskUserCreationAttributes> {
    @ForeignKey(() => User)
    @Column
    freeworkerId?: number;

    @ForeignKey(() => Task)
    @Column
    seniorId: number;

    @Column
    description: string;

    @ForeignKey(() => User)
    @Column
    validationFreeworkerId?: boolean;

    @ForeignKey(() => User)
    @Column
    validationSeniorId: boolean;

    @Column
    datetime: Date;

    @CreatedAt
    timestamp: Date;
}