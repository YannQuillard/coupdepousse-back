import { IsNotEmpty, IsPhoneNumber, IsString, IsNumber, IsDate, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    avatar?: string;

    @IsOptional()
    @IsNumber()
    helped_people?: number;

    address?: string;

    city: string;
    country: string;
    postalCode: string;

    @IsOptional()
    @IsNumber()
    latitude: number;

    @IsOptional()
    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsDate()
    birthdate?: Date;

    @IsBoolean()
    @IsNotEmpty()
    freeworker: boolean;
}