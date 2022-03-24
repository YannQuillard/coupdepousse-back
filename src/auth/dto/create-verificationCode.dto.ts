import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateVerificationCodeDto {
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsNumber()
    code: number;

    @IsNotEmpty()
    @IsDate()
    timestamp: number;
}