import { Optional } from 'sequelize';
import { Column, Model, Table, CreatedAt, AllowNull, Unique } from 'sequelize-typescript';

interface TaskUserAttributes {
    id: number,
    userId: number,
    freeworkerId: number,
    taskId: number,
    description: string
    validationFreeworkerId: boolean,
    validationSeniorId: boolean,
    datetime: string
}

interface TaskUserCreationAttributes extends Optional<TaskUserAttributes, 'id'> {}

@Table
export class TaskUser extends Model<TaskUserAttributes, TaskUserCreationAttributes> {
    @Column
    userId: number;

    @AllowNull
    @Column
    freeworkerId?: number;

    @Column
    taskId: number;

    @Column
    description: string;

    @AllowNull
    @Column
    validationFreeworkerId?: boolean;

    @Column
    validationSeniorId: boolean;

    @Column
    datetime: string;

    @CreatedAt
    timestamp: Date;
}