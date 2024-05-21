import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, VehicleType } from 'src/schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(VehicleType.name) private vehicleModel: Model<VehicleType>,
  ) {}
  public async updateDriverInfor(body: any, typeAction: string) {
    // {
    //     id
    //     data:{},
    // }
    try {
      const existedUser = await this.userModel.findById(body?.id);
      if (!existedUser) throw new BadRequestException('Not found');
      if (typeAction === 'add-vehicle') {
        existedUser.vehicles.push({
          vehicleName: body?.data.vehicleName,
          lisencePlate: body?.data.lisencePlate,
          vehicleImage: body?.data.vehicleImage,
          cavetImage: body?.data.cavetImage,
          cavetText: body?.data.cavetText,
          vehicleType: 'vehicleType',
        });
      }
      if (typeAction === 'update-vehicle') {
        // this.userModel.findOneAndUpdate(
        //   { _id: body?.id, 'vehicles.id': 2 },
        //   {
        //     $set: {
        //       vehicles: {},
        //     },
        //   },
        // );
        existedUser.vehicles.forEach(e=>{
          if(e._id === 'i')
        })
      }
      await existedUser.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
