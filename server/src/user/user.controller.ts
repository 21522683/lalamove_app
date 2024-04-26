import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('users')
export class UserController {

    constructor (private userService: UserService){}
    
    @Post('register-user')
    @UsePipes(new ValidationPipe())
    createUserCtrl(@Body() createUserDto: CreateUser){
        return this.userService.createUser(createUserDto);
    }
    @Post('register-driver')
    @UsePipes(new ValidationPipe())
    createDriverCtrl(@Body() createUserDto: CreateUser){
        return this.userService.createUser(createUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ValidationPipe())
    loginUserCtrl(@Body() loginUserDto: LoginUserDto){
        return this.userService.loginUser(loginUserDto);
    }
}
