import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas';
import { VehicleType } from 'src/schemas/VehicleType.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }
    async getDriverInfor(id: string, query: string) {
        console.log(id, query)
        if (!id) throw new BadRequestException('Người dùng không tồn tại.');
        const exitedUser = await this.userModel.findById(id).populate({
            path: 'vehicles',
            populate: { path: 'vehicleType' }
        })
        if (!exitedUser) throw new BadRequestException('Người dùng không tồn tại.');

        const { password, driverLisences, vehicles } = exitedUser;

        if (query === 'license') {
            return driverLisences
        }
        if (query === 'vehicles') {
            return vehicles
        }

        return exitedUser;

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
        if (!body.id) throw new BadRequestException('Người dùng không tồn tại.');
        const exitedUser = await this.userModel.findById(body.id);
        if (!exitedUser) throw new BadRequestException('Người dùng không tồn tại.');

        if (body?.action === 'add vehicle') {
            exitedUser.vehicles.push({
                vehicleName: body?.data.vehicleName,
                lisencePlate: body?.data.lisencePlate,
                vehicleImage: body?.data.vehicleImage,
                cavetImage: body?.data.cavetImage,
                cavetText: body?.data.cavetText,
                vehicleType: '66305002c1dde724a48e01d5',
                status: 'Đang kiểm tra'
            })
        } else if (body?.action === 'update vehicle') {
            exitedUser.vehicles.forEach(v => {
                if (v.id === body?.data?.id) {

                }
            })
        }
    }
}
