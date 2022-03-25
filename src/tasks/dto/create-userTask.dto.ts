import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserTasksDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsNumber()
    freeworkerId?: number;

    @IsNotEmpty()
    @IsNumber()
    taskId?: number;

    @IsOptional()
    @IsBoolean()
    validationSeniorId?: boolean;

    @IsOptional()
    @IsBoolean()
    validationFreeworkerId?: boolean;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    datetime?: string;
}