import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateUserTasksDto {

    @IsNumber()
    freeworkerId?: number;

    @IsNotEmpty()
    @IsNumber()
    seniorId: number;

    @IsNotEmpty()
    @IsNumber()
    validationSeniorId: boolean;

    @IsNotEmpty()
    @IsNumber()
    validationFreeworkerId?: boolean;

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