import { IsNotEmpty, IsString, IsUrl } from 'class-validator';


export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsUrl()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    command: string;
}