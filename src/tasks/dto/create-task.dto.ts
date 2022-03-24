import { IsNotEmpty, IsString, IsUrl } from 'class-validator';


export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}