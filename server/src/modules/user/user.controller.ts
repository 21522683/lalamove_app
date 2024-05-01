import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, LoginUserDto ,} from '../../dtos';

@Controller('users')
export class UserController {

}
