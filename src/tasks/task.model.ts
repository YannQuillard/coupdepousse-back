import { Optional } from 'sequelize';
import { ForeignKey, Column, Model, Table, Unique, } from 'sequelize-typescript';

interface TaskAttributes {
    id: number,
    title: string,
    image: string
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

@Table
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
    @Column
    @Unique
    title: string;

    @Column
    image: string;
}