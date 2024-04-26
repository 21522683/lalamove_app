import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, LoginUserDto } from 'src/dtos';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-user')
  @UsePipes(new ValidationPipe())
  createUserCtrl(@Body() createUserDto: CreateUser) {
    return this.authService.createUser(createUserDto);
  }
  @Post('register-driver')
  @UsePipes(new ValidationPipe())
  createDriverCtrl(@Body() createUserDto: CreateUser) {
    return this.authService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  loginUserCtrl(@Body() loginUserDto: LoginUserDto) {
    const user = this.authService.loginUser(loginUserDto);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    return user;
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
