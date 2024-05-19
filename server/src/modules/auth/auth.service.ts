import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { templateHTMLResetPassword } from 'src/constants/template_email_resetpass';
import { templateHTMLVerifyEmail } from 'src/constants/template_email_verify_email';
import { CreateDriver, CreateUser, LoginUserDto } from 'src/dtos';
import { User } from 'src/schemas';
import { VehicleType } from 'src/schemas/VehicleType.schema';
import { sendEmail } from 'src/utils/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(VehicleType.name) private vehicleModel: Model<VehicleType>,
    private jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUser) {
    const exitedUser = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (exitedUser && exitedUser.userType === createUserDto.userType) throw new BadRequestException('Username đã tồn tại.');
    try {
      const newUser = new this.userModel(createUserDto);
      const u = await newUser.save();
      await sendEmail(createUserDto.email, templateHTMLVerifyEmail(u?.id, createUserDto.email), "Xác thực email");
      return u;
    } catch (error) {
      return error;
    }
  }
  async verifyMail(id: string) {
    const exitedUser = await this.userModel.findById(id);
    if (!exitedUser) throw new BadRequestException('Người dùng không tồn tại.');
    try {
      exitedUser.isActive = true;
      await exitedUser.save();
      return "Xác thực email thành công. Vui lòng đăng nhập lại để vào được hệ thống.";
    } catch (error) {
      return "Xác thực email thất bại!";
    }
  }
  async createVehicleType() {
    const newVehicleType = new this.vehicleModel({
      vehicleTypeName: 'Xe máy',
      mount: '30kg',
      size: '50cm x 40cm x 50cm',
      minPrice: 16200,
      minLength: 3,
      priceAddIfOut: 4320,
      suitableFor: 'Giao hàng hóa nhỏ như tài liệu, thực phẩm, mỹ phẩm, quần áo hoặc phụ kiện.',
      note: 'Phí dịch vụ được dựa trên nhiều yếu tố như tình hình giao thông, kích thước hàng hóa, khả năng nhận đơn của đối tác tài xế, phí cầu đường, các phụ phí,... Vì vậy tổng giá dịch vụ có thể thay đổi. Giá hiển thị tại thời điểm đặt đơn có thể không giữ nguyên nếu có thay đổi về chi tiết đơn hàng.'
    });
    return newVehicleType.save();
  }
  async sendRegisterDriver(createDriver: CreateDriver) {
    const exitedUser = await this.userModel.findOne({
      phoneNumber: createDriver.phoneNumber,
    });
    if (exitedUser && exitedUser.userType === createDriver.userType) throw new BadRequestException('Số điện thoại đã tồn tại.');
    try {
      const newUser = new this.userModel({
        phoneNumber: createDriver.phoneNumber,
        email: createDriver.email,
        password: '123123123',
        userType: 'Driver',
        fullName: createDriver.fullName,
        CCCDText: createDriver.CCCDText,
        CCCDImage: createDriver.CCCDImage,
        address: createDriver.address,
        avatar: createDriver.avatar,
        dob: createDriver.dob,
        driverLisences: [{
          driverLisenceImage: createDriver.driverLisenceImage,
          driverLisenceNumber: createDriver.driverLisenceNumber,
          driverLisenceType: createDriver.driverLisenceType
        }],
        vehicles: [{
          vehicleName: createDriver.vehicleName,
          lisencePlate: createDriver.lisencePlate,
          vehicleImage: createDriver.vehicleImage,
          cavetImage: createDriver.cavetImage,
          cavetText: createDriver.cavetText,
          vehicleType: '66305002c1dde724a48e01d5'
        }],
        isWaitingAccepted: true,
        isActive: false,
      });
      return newUser.save();
    } catch (error) {
      return error;
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<Record<string, string>> {
    const exitedUser = await this.userModel.findOne({
      phoneNumber: loginUserDto.phoneNumber,
    });
    if (!exitedUser) throw new BadRequestException('Sai tài khoản hoặc mật khẩu.');
    if (exitedUser && !(await exitedUser.checkPassword(loginUserDto.password))) {
      console.log(loginUserDto)
      throw new BadRequestException('Sai tài khoản hoặc mật khẩu.');
    }
    if (exitedUser.userType !== loginUserDto.userType) {
      throw new BadRequestException('Sai tài khoản hoặc mật khẩu.');
    }
    if (!exitedUser.isActive && exitedUser.userType === 'User') {
      await sendEmail(exitedUser.email, templateHTMLVerifyEmail(exitedUser?.id, exitedUser.email), "Xác thực email");

      throw new BadRequestException('Tài khoản chưa được xác thực email. Vui lòng xác minh email chúng tôi vừa gửi.');
    }

    const payload = { sub: exitedUser.id, username: exitedUser.phoneNumber };

    return {
      id: exitedUser.id,
      fullname: exitedUser.fullName,
      avatar: exitedUser.avatar,
      userType: exitedUser.userType,
      access_token: this.jwtService.sign(payload),
    };
  }
  async loginByGG(loginUserDto: any): Promise<Record<string, string>> {
    console.log('hehe')
    const exitedUser = await this.userModel.findOne({
      phoneNumber: loginUserDto?.id,
      email: loginUserDto?.email
    });

    if (!exitedUser) {
      const newUser = new this.userModel({
        phoneNumber: loginUserDto?.id,
        password: '1',
        email: loginUserDto?.email,
        userType: 'User',
        fullName: loginUserDto?.name,
        isActive: true,
        avatar: loginUserDto?.photo
      });
      const u = await newUser.save();
      const payload = { sub: u.id, username: u.phoneNumber };

      return {
        id: u.id,
        fullname: u.fullName,
        avatar: u.avatar,
        userType: u.userType,
        access_token: this.jwtService.sign(payload),
      };
    };

    const payload = { sub: exitedUser.id, username: exitedUser.phoneNumber };

    return {
      id: exitedUser.id,
      fullname: exitedUser.fullName,
      avatar: exitedUser.avatar,
      userType: exitedUser.userType,
      access_token: this.jwtService.sign(payload),
    };
  }
  async sendEmailReset(phoneNumber: string): Promise<Record<string, string>> {
    const exitedUser = await this.userModel.findOne({ phoneNumber: phoneNumber });
    if (!exitedUser) throw new BadRequestException("Người dùng không tồn tại.");
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

  async checkOtp(otp: string, phoneNumber: string): Promise<Record<string, string>> {
    const exitedUser = await this.userModel.findOne({ phoneNumber: phoneNumber });
    if (!exitedUser) throw new NotFoundException("Người dùng không tồn tại.");
    if (exitedUser?.passwordResetToken !== otp) throw new BadRequestException("Mã xác thực không chính xác.");
    if (exitedUser?.passwordResetExpires < new Date()) throw new BadRequestException("Mã đã hết hạn.");
    return {
      message: 'ok'
    }
  }
  async resetPassword(phoneNumber: string, pass: string): Promise<Record<string, string>> {
    const exitedUser = await this.userModel.findOne({ phoneNumber: phoneNumber });
    if (!exitedUser) throw new NotFoundException("Người dùng không tồn tại.");
    exitedUser.password = pass;
    exitedUser.save();

    return {
      message: 'ok'
    }
  }
}
