import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
) { }
  async getDriverInfor(id: string, query: string) {
    try {
      if (!id) throw new BadRequestException('Người dùng không tồn tại.');
      const exitedUser = await this.userModel.findById(id).populate({
        path: 'vehicles',
        populate: { path: 'vehicleType' },
      });
      if (!exitedUser)
        throw new BadRequestException('Người dùng không tồn tại.');

      const { password, driverLisences, vehicles } = exitedUser;

      if (query === 'license') {
        return driverLisences;
      }
      if (query === 'vehicles') {
        return vehicles;
      }

      return exitedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async updateDriverInfor(body: any) {
    // {
    //     userid?
    //     action: 'add vehicle', 'update vehicle', 'add license', 'update license',
    //     data:{
    //         id? (if update)
    //         ... dt
    //     }
    // }
    try {
      if (!body.id) throw new BadRequestException('Người dùng không tồn tại.');
      const exitedUser = await this.userModel.findById(body.id);
      if (!exitedUser)
        throw new BadRequestException('Người dùng không tồn tại.');

      if (body?.action === 'add vehicle') {
        exitedUser.vehicles.push({
          id: uuidv4(),
          vehicleName: body?.data.vehicleName,
          lisencePlate: body?.data.lisencePlate,
          vehicleImage: body?.data.vehicleImage,
          cavetImage: body?.data.cavetImage,
          cavetText: body?.data.cavetText,
          vehicleType: '66305002c1dde724a48e01d5',
          status: 'Đang kiểm tra',
        });
      } else if (body?.action === 'update vehicle') {
        exitedUser.vehicles.forEach((v) => {
          if (v.id === body?.data?.id) {
            v = { ...body?.data };
          }
        });
      } else if (body?.action === 'add license') {
        exitedUser.driverLisences.push({
          id: uuidv4(),
          driverLisenceImage: body?.data.driverLisenceImage,
          driverLisenceNumber: body?.data.driverLisenceNumber,
          driverLisenceType: body?.data.driverLisenceType,
          status: 'Đang kiểm tra',
        });
      } else if (body?.action === 'update license') {
        exitedUser.driverLisences.forEach((d) => {
          if (d.id === body?.data?.id) {
            d = { ...body?.data };
          }
        });
      }
      await exitedUser.save();
      return 'OK';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async currentUser(id: ObjectId) {
    const exitedUser = await this.userModel.findById(id);
    if (!exitedUser) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }
    return exitedUser.toObject();
  }
}
