import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }
    async currentUser(id: ObjectId) {
        const exitedUser = await this.userModel.findById(id);
        if (!exitedUser) {
            throw new NotFoundException('Người dùng không tồn tại.');
        }
        return exitedUser.toObject();
    }

}
