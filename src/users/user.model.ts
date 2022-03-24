import { Optional } from 'sequelize';
import { AllowNull, Unique, Column, Model, Table, } from 'sequelize-typescript';

interface UserAttributes {
    id: number,
    firstName: string,
    lastName: string,
    phone: string,
    description?: string,
    avatar?: string,
    helped_people?: number,
    address?: string,
    city: string,
    country: string,
    postalCode: string,
    latitude: string,
    longitude: string,
    birthdate?: Date,
    isValidate: boolean
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
    helped_people: number;

    @AllowNull
    @Column
    address: string;

    @AllowNull
    @Column
    city: string;

    @AllowNull
    @Column
    country: string;

    @AllowNull
    @Column
    postalCode: string;

    @AllowNull
    @Column
    latitude: string;

    @AllowNull
    @Column
    longitude: string;

    @AllowNull
    @Column
    birthdate: Date;

    @AllowNull
    @Column
    signup_date: Date;

    @AllowNull
    @Column
    isValidate: boolean;
}