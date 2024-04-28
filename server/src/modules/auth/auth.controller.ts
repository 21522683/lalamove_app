import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, LoginUserDto } from 'src/dtos';
import { Public } from './authPublic.decorator';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Public()
  @Post('register-user')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUser, @Res() res : Response) {
    
    res.status(200).json(this.authService.createUser(createUserDto));

  }

  @Public()
  @Post('register-driver')
  @UsePipes(new ValidationPipe())
  createDriver(@Body() createUserDto: CreateUser, @Res() res : Response) {
    return this.authService.createUser(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() loginUserDto: LoginUserDto, @Res() res : Response) {
    const user = this.authService.loginUser(loginUserDto);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    res.status(200).json(user);
  }

  @Public()
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get(':id/check-email')
   checkEmail(@Param("id") id: string, @Query() queryParams: any, @Res() res : Response) {
     return this.authService.checkEmail(queryParams.email, id);
  }

  @Public()
  @Get(':id/check-otp')
  checkOtpReset(@Param("id") id: string, @Query() queryParams: any, @Res() res : Response) {
    return this.authService.checkOtp(queryParams.otp, id)
   
  }

  @Public()
  @Get(':id/reset-password')
  resetPassword() {
    return [];
  }
}
