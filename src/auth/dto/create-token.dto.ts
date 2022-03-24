import { IsNotEmpty, IsPhoneNumber, IsString, IsNumber, IsDate, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreateTokenDto {
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;

    readonly token: string;

    readonly timestamp: number;
}