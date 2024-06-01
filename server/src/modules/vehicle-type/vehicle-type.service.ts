import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehicleType } from 'src/schemas/VehicleType.schema';
import { UpdateVehicleTypeDTO } from './DTO/update_vehicle_type.dto';
import { User } from 'src/schemas';
import { CreateVehicleTypeDTO } from './DTO/create_vehicle_type.dto copy';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectModel(VehicleType.name) private vehicleTypeModel: Model<VehicleType>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async addNewVehicleType(userId: string, vehicleType: CreateVehicleTypeDTO) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new ForbiddenException('Không có quyền');
    if (user.userType !== 'Admin')
      throw new ForbiddenException('Không có quyền');

    const newVehicleType = new this.vehicleTypeModel(vehicleType);
    return await newVehicleType.save();
  }

  async updateNewVehicleType(
    vehicleTypeId: string,
    body: UpdateVehicleTypeDTO,
  ) {
    return await this.vehicleTypeModel.findByIdAndUpdate(vehicleTypeId, body, {
      new: true,
    });
  }

  async getVehicleTypes() {
    return await this.vehicleTypeModel.find();
  }
}
