import { IsEmail, IsString } from 'class-validator';

export class CreateDetailUserDto {
    @IsString()
    id_user: number;
    
    @IsString()
    id_type: number;

}
