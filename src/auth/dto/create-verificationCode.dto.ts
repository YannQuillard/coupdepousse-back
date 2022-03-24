import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateVerificationCodeDto {
    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @IsNotEmpty()
    @IsNumber()
    readonly code: number;

    @IsNotEmpty()
    @IsDate()
    readonly timestamp: number;
}