import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateVerificationCodeDto {
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNumber()
    code?: number;
}