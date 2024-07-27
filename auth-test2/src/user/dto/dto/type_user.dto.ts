import { IsEmail, IsString } from 'class-validator';

export class TypeUser { 

    @IsString()
    desc: string;

}
