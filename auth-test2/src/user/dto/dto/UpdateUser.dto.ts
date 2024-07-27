import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    id_type: number;

    @IsNumber()
    id_user: number;
}
