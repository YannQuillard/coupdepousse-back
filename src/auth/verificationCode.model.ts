import { Optional } from 'sequelize';
import { Column, Model, Table, CreatedAt } from 'sequelize-typescript';

interface VerificationCodeAttributes {
    id: number,
    phone: string,
    code: number,
    timestamp: number,
}

interface VerificationCodeCreationAttributes extends Optional<VerificationCodeAttributes, 'id'> {}

@Table
export class VerificationCode extends Model<VerificationCodeAttributes, VerificationCodeCreationAttributes> {
    @Column
    phone: string;

    @Column
    code: number;

    @CreatedAt
    timestamp: Date;
}