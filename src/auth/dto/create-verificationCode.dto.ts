import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateVerificationCodeDto {
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsOptional()
    @IsNumber()
    code?: number;
}