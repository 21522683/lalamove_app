import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, VehicleType } from 'src/schemas';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { updateInfoUserDto } from 'src/dtos/UpdateInfoUser.dto';
import { updatePassUserDto } from 'src/dtos/updatePassUser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(VehicleType.name) private readonly vehicleTypeModel: Model<VehicleType>,
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

  async updateUser(userId: string, updateInfoUserDto: updateInfoUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: updateInfoUserDto },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return updatedUser;
  }

  async updatePasswordUser(userId: string, updatePassUserDto: updatePassUserDto) {
    const updatedUser = await this.userModel.findOne({ _id: userId });
    updatedUser.password = updatePassUserDto.password;
    await updatedUser.save();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return updatedUser;
  }

  async getAllDriver(query: any) {
    const { textSearch, option } = query;
    let filter: any = {};

    if (textSearch) {
      filter.fullName = { $regex: textSearch, $options: 'i' };
    }

    switch (option) {
      case 'Đang bị khóa':
        filter.isActive = false;
        break;
      case 'Đang hoạt động':
        filter.isActive = true;
        filter.isWaitingAccepted = true;
        break;
      case 'Chờ xét duyệt':
        filter.isActive = true;
        filter.isWaitingAccepted = false;
        break;
      default:
        // If option is "Tất cả" or any other value, no additional filter is added
        break;
    }

    filter.userType = "Driver";

    const listDriver = await this.userModel
      .find(filter)
      .populate({
        path: 'vehicles',
        populate: {
          path: 'vehicleType',
          model: this.vehicleTypeModel,
        },
      })
      .exec();

    return listDriver;
  }
}
