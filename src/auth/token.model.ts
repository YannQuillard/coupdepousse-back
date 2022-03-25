import { Optional } from 'sequelize';
import { ForeignKey, Column, Model, Table, CreatedAt, PrimaryKey } from 'sequelize-typescript';
import { User } from '../users/user.model'

interface TokenAttributes {
    id: number,
    phone: string,
    code: number,
    timestamp: number,
}

interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

@Table
export class Token extends Model<TokenAttributes, TokenCreationAttributes> {
    @ForeignKey(() => User)
    @Column
    userId: string;

    @Column
    token: number;

    @CreatedAt
    timestamp: Date;
}