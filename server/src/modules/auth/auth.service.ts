import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser, LoginUserDto } from 'src/dtos';
import { generateTokenJwt } from 'src/middlewares/token';
import { User } from 'src/schemas';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUser) {
    const exitedUser = await this.userModel.findOne({
      phoneNumber: createUserDto.phoneNumber,
    });
    if (exitedUser) throw new Error('User really existed');
    try {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      return error;
    }
  }

  sendRegisterDriver() {}

  async loginUser(loginUserDto: LoginUserDto) : Promise<Record<string, string>>{
    const exitedUser = await this.userModel.findOne({
      phoneNumber: loginUserDto.phoneNumber,
    });
    if (!exitedUser) throw new UnauthorizedException();
    if (exitedUser && !(await exitedUser.checkPassword(loginUserDto.password))) {
        throw new UnauthorizedException();
    } 
    const payload = { sub: exitedUser.id, username: exitedUser.phoneNumber };
    
    return  {
        phoneNumber:exitedUser.phoneNumber,
        avatar: exitedUser.avatar,
        userType:exitedUser.userType,
        access_token:  this.jwtService.sign(payload),
    };
  }
}
