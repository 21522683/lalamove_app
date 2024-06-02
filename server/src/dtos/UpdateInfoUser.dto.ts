import { IsNotEmpty, IsString } from 'class-validator';

export class updateInfoUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    dob: Date;

    @IsString()
    @IsNotEmpty()
    avatar: string;
}
