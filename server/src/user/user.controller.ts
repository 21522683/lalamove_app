import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/CreateUser.dto';

@Controller('users')
export class UserController {

    constructor (private userService: UserService){}
    
    @Post('user')
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUser){
        return this.userService.createUser(createUserDto);
    }


    loginUser(){

    }
}
