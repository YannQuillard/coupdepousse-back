import { IsNotEmpty, IsPhoneNumber, IsString, IsNumber, IsDate, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsOptional()
    @IsString()
    readonly lastName?: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    readonly phone: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsUrl()
    readonly avatar?: string;

    @IsOptional()
    @IsNumber()
    readonly helped_people?: number;

    readonly address?: string;

    @IsOptional()
    @IsDate()
    readonly birthdate?: Date;

    @IsBoolean()
    @IsNotEmpty()
    readonly freeworker: boolean;
}