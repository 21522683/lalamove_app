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
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDriver, CreateUser, LoginUserDto } from 'src/dtos';
import { Public } from './authPublic.decorator';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('register-user')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUser, @Res() res: Response) {
    const user = await this.authService.createUser(createUserDto);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    console.log(user);
    res.status(200).json(user);
  }

  @Public()
  @Post('register-driver')
  @UsePipes(new ValidationPipe())
  async createDriver(@Body() createDriver: CreateDriver, @Res() res: Response) {
    const user = await this.authService.sendRegisterDriver(createDriver);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    console.log(user);
    res.status(200).json(user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.loginUser(loginUserDto);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    console.log(user);
    res.status(200).json(user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login-by-google')
  async loginUserByGG(@Body() body: any, @Res() res: Response) {
    console.log('hehe');
    const user = await this.authService.loginByGG(body);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    console.log(user);
    res.status(200).json(user);
  }

  @Public()
  @Get('vehicle-type')
  @HttpCode(HttpStatus.OK)
  async getAllVehicleType(@Res() res: Response) {
    const a = await this.authService.getAllVehicleType();
    if (!a) throw new HttpException('Invalid Credentials', 401);
    res.status(200).json(a);
  }

  @Public()
  @Get('check-phone')
  async checkEmail(@Query() queryParams: any, @Res() res: Response) {
    const u = await this.authService.sendEmailReset(queryParams.phoneNumber);
    res.status(200).json(u);
  }
  @Public()
  @Get('check-phone-driver')
  async checkPhoneNumberDriver(
    @Query() queryParams: any,
    @Res() res: Response,
  ) {
    const u = await this.authService.sendEmailReset(queryParams.phoneNumber);
    res.status(200).json(u);
  }

  @Public()
  @Get(':phoneNumber/check-otp')
  async checkOtpReset(
    @Param('phoneNumber') phoneNumber: string,
    @Query() queryParams: any,
    @Res() res: Response,
  ) {
    const u = await this.authService.checkOtp(queryParams.otp, phoneNumber);
    res.status(200).json(u);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Req() req: Request, @Res() res: Response) {
    const u = await this.authService.resetPassword(
      req?.body?.phoneNumber,
      req?.body?.password,
    );
    res.status(200).json(u);
  }
  @Public()
  @Get(':id/verify-email')
  async verifyMail(@Param('id') id: string, @Res() res: Response) {
    const user = await this.authService.verifyMail(id);
    res.status(200).json(user);
  }
}
