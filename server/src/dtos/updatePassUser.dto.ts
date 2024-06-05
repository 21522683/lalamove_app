import { IsNotEmpty, IsString } from 'class-validator';

export class updatePassUserDto {
    @IsNotEmpty()
    @IsString()
    password: string;
}
