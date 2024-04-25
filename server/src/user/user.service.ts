import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUser } from './dto/CreateUser.dto';
import { User } from 'src/schemas';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    createUser( createUserDto: CreateUser){
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
}
