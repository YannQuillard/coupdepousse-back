import { Optional } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript';

interface PersonAttributes {
    id: number
}
  
interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'> {}
  
@Table
export class User extends Model<PersonAttributes, PersonCreationAttributes>  {    
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    phone: string;

    @Column
    description: string;

    @Column
    avatar: string;

    @Column
    helped_people: string;

    @Column
    address: string;

    @Column
    birthdate: Date;

    @Column
    signup_date: Date;

    @Column
    freeworker: boolean;
}