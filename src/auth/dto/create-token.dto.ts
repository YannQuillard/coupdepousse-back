import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTokenDto {
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;

    @IsNotEmpty()
    @IsString()
    readonly token: string;

    @IsNotEmpty()
    @IsDate()
    readonly timestamp: number;
}