import { IsNotEmpty, IsPhoneNumber, IsString, IsNumber, IsDate, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreateMessageDto {
    id: string
    text: string
    creationTime: Date
    senderName: string
}