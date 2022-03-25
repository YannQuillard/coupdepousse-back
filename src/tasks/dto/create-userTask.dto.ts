import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateUserTasksDto {

    @IsNotEmpty()
    @IsNumber()
    freeworkerId: number;

    @IsNotEmpty()
    @IsNumber()
    seniorId: number;

    @IsNotEmpty()
    @IsNumber()
    validationSeniorId: number;

    @IsNotEmpty()
    @IsNumber()
    validationFreeworkerId: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDate()
    datetime: Date;

    @IsNotEmpty()
    @IsDate()
    timestamp: Date;
}