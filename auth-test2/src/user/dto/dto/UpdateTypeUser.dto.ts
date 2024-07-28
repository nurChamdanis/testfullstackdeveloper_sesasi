import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    id_detail: string; 
    
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    id_type: string;

    @IsNumber()
    id_user: string;
}
