import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { templateHTMLResetPassword } from 'src/constants/template_email';
import { CreateUser, LoginUserDto } from 'src/dtos';
import { User } from 'src/schemas';
import { sendEmail } from 'src/utils/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUser) {
    const exitedUser = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (exitedUser) throw new BadRequestException('Số điện thoại đã tồn tại.');
    try {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      return error;
    }
  }

  sendRegisterDriver() { }

  async loginUser(loginUserDto: LoginUserDto): Promise<Record<string, string>> {
    const exitedUser = await this.userModel.findOne({
      phoneNumber: loginUserDto.phoneNumber,
    });
    if (!exitedUser) throw new UnauthorizedException();
    if (exitedUser && !(await exitedUser.checkPassword(loginUserDto.password))) {
      throw new UnauthorizedException();
    }
    if (exitedUser.userType !== loginUserDto.userType) {
      throw new UnauthorizedException();
    }
    const payload = { sub: exitedUser.id, username: exitedUser.phoneNumber };

    return {
      phoneNumber: exitedUser.phoneNumber,
      avatar: exitedUser.avatar,
      userType: exitedUser.userType,
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkEmail(email: string, id: string) : Promise<Record<string, string>>{
    const exitedUser = await this.userModel.findById(id);
    if (!exitedUser) throw new BadRequestException("Người dùng không tồn tại.");
    if (exitedUser?.email !== email) throw new BadRequestException("Email được nhập không khớp với email đã đăng ký.");
    try {
      let randomString = '';
      for (let i = 0; i < 4; i++) {
          // Tạo một số ngẫu nhiên từ 0 đến 9
          const randomDigit = Math.floor(Math.random() * 10);
          // Thêm số ngẫu nhiên vào chuỗi
          randomString += randomDigit;
      }
      exitedUser.createResetPassToken(randomString);
      exitedUser.save();
      return await sendEmail('21522448@gm.uit.edu.vn', templateHTMLResetPassword(randomString), "Đặt lại mật khẩu")

    } catch (error) {
      throw new BadRequestException("Lỗi kết nối.");
    }
  }

  async checkOtp(otp:string, id:string): Promise<Record<string, string>>{
    const exitedUser = await this.userModel.findById(id);
    if (!exitedUser) throw new NotFoundException("Người dùng không tồn tại.");
    if (exitedUser?.passwordResetToken !== otp) throw new BadRequestException("Mã xác thực không chính xác.");
    if(exitedUser?.passwordResetExpires < new Date()) throw new BadRequestException("Mã đã hết hạn.");
    return {
      message:'ok'
    }
  }
}
