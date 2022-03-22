import { Optional } from 'sequelize';
import { AllowNull, Unique, Column, Model, Table } from 'sequelize-typescript';

interface UserAttributes {
    id: number
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column
    firstName: string;

    @AllowNull
    @Column
    lastName: string;

    @Unique
    @Column
    phone: string;

    @AllowNull
    @Column
    description: string;

    @AllowNull
    @Column
    avatar: string;

    @AllowNull
    @Column
    helped_people: string;

    @AllowNull
    @Column
    address: string;

    @AllowNull
    @Column
    birthdate: Date;

    @AllowNull
    @Column
    signup_date: Date;

    @AllowNull
    @Column
    freeworker: boolean;
}