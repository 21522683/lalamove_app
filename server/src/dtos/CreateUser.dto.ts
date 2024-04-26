import { IsNotEmpty, IsString } from "class-validator";

export class CreateUser{
    @IsNotEmpty()
    @IsString()
    phoneNumber:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    userType:string;

}