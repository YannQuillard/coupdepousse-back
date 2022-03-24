import { IsNotEmpty, IsPhoneNumber, IsString, IsNumber, IsDate, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserTasksDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    taskId: number;

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