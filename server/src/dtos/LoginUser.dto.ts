import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    phoneNumber:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    userType:string;

}