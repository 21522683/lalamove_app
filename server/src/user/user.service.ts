import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUser } from './dto/CreateUser.dto';
import { User } from 'src/schemas';
import { LoginUserDto } from './dto/LoginUser.dto';
import { generateTokenJwt } from 'src/middlewares/token';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(createUserDto: CreateUser) {
        const exitedUser = await this.userModel.findOne({phoneNumber: createUserDto.phoneNumber});
        if (exitedUser) throw new Error("User really existed");
        try {
            const newUser = new this.userModel(createUserDto);
            return newUser.save();
        } catch (error) {
            return error;
        }
    }

    sendRegisterDriver() { }

    async loginUser(loginUserDto: LoginUserDto) {
        const exitedUser = await this.userModel.findOne({phoneNumber: loginUserDto.phoneNumber});
        if (!exitedUser) throw new Error("User not existed");
        if (exitedUser && (await exitedUser.checkPassword(loginUserDto.password))) {
            let token;
            token = generateTokenJwt(exitedUser.id)
            return {
                phoneNumber: exitedUser?.phoneNumber,
                email: exitedUser?.email,
                avatar: exitedUser?.avatar,
                userType: exitedUser?.userType,
                token: token
            }
        } else {
            
            throw new UnauthorizedException();
        }
         
    }
}
