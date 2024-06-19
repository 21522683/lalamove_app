import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, VehicleType } from 'src/schemas';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { updateInfoUserDto } from 'src/dtos/UpdateInfoUser.dto';
import { updatePassUserDto } from 'src/dtos/updatePassUser.dto';
import { sendEmail } from 'src/utils/email.service';
import { templateEmailAcceptDriver } from 'src/constants/template_email_accept_driver';
import { templateEmailRejectDriver } from 'src/constants/template_email_reject_driver';
import { templateEmailLockDriver } from 'src/constants/template_email_lock_account';
import { templateEmailRestoreDriver } from 'src/constants/template_email_restore';
import { templateEmailAcceptLisencesDriver } from 'src/constants/template_email_accept_lisences_driver';
import { templateEmailRejectLisencesDriver } from 'src/constants/template_email_reject_lisences_driver';
import { templateEmailAcceptVehiclesDriver } from 'src/constants/template_email_accept_vehicles_driver';
import { templateEmailRejectVehiclesDriver } from 'src/constants/template_email_reject_vehicles_driver';
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
      if (query === 'reviews') {
        return;
      }

      return exitedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async updateDriverInfor(body: any) {
    // {
    //     id?
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
          vehicleType: body?.data.vehicleType,
          status: 'Đang kiểm tra',
        });
      } else if (body?.action === 'update vehicle') {
        exitedUser.vehicles.forEach((v, index) => {
          if (v.id === body?.data?.id) {
            v = { ...body?.data, status: 'Đang kiểm tra' };
            exitedUser.vehicles[index] = { ...v }
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
        console.log(body)
        exitedUser.driverLisences.forEach((d, index) => {
          if (d.id === body?.data?.id) {
            d = { ...body?.data, status: 'Đang kiểm tra' };
            exitedUser.driverLisences[index] = { ...d };

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
        filter.isLocked = true;
        break;
      case 'Đang hoạt động':
        filter.isLocked = false;
        filter.isWaitingAccepted = false;
        break;
      case 'Chờ xét duyệt':
        filter.isLocked = false;
        filter.isWaitingAccepted = true;
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

  async getAllLisencesOfUser(id: string, query: any) {
    const { textSearchLisences } = query;
    let filter: any = {};

    filter._id = id;

    filter.userType = "Driver";

    const listDriver = await this.userModel
      .findOne(filter)
      .populate({
        path: 'vehicles',
        populate: {
          path: 'vehicleType',
          model: this.vehicleTypeModel,
        },
      })
      .exec();
    if (textSearchLisences === '' || textSearchLisences.trim().length === 0) {
      return listDriver.driverLisences;
    } else {
      const filteredLicenses = listDriver.driverLisences.filter(license =>
        license.driverLisenceNumber.includes(textSearchLisences)
      );
      return filteredLicenses;
    }
  }

  async getAllVehiclesOfUser(id: string, query: any) {
    const { textSearchVehicles } = query;
    let filter: any = {};

    filter._id = id;

    filter.userType = "Driver";

    const listDriver = await this.userModel
      .findOne(filter)
      .populate({
        path: 'vehicles',
        populate: {
          path: 'vehicleType',
          model: this.vehicleTypeModel,
        },
      })
      .exec();
    if (textSearchVehicles === '' || textSearchVehicles.trim().length === 0) {
      return listDriver.vehicles;
    } else {
      const filteredVehicles = listDriver.vehicles.filter(item =>
        item.vehicleName.includes(textSearchVehicles) || item.lisencePlate.includes(textSearchVehicles)
      );
      return filteredVehicles;
    }
  }


  async acceptDriver(id: string) {
    const updatedUser = await this.userModel.findOne({ _id: id });
    updatedUser.isWaitingAccepted = false;
    // sendmail
    await sendEmail(
      updatedUser.email,
      templateEmailAcceptDriver(updatedUser.fullName),
      'Kết quả xét duyệt tài xế từ Shipmate',
    );

    await updatedUser.save();

    return updatedUser;
  }

  async rejectDriver(id: string, reason: string) {
    const updatedUser = await this.userModel.findById(id);
    updatedUser.isWaitingAccepted = true;
    // send mail
    await sendEmail(
      updatedUser.email,
      templateEmailRejectDriver(updatedUser.fullName, reason),
      'Kết quả xét duyệt tài xế từ Shipmate',
    );

    await updatedUser.save();

    return updatedUser;
  }

  async lockDriver(id: string, reason: string) {
    const updatedUser = await this.userModel.findById(id);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    updatedUser.isLocked = true;
    // send mail
    await sendEmail(
      updatedUser.email,
      templateEmailLockDriver(updatedUser.fullName, reason),
      'Thông báo từ Shipmate',
    );

    await updatedUser.save();

    return updatedUser;
  }

  async restoreDriver(id: string) {
    const updatedUser = await this.userModel.findById(id);

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    updatedUser.isLocked = false;
    // send mail
    await sendEmail(
      updatedUser.email,
      templateEmailRestoreDriver(updatedUser.fullName),
      'Thông báo từ Shipmate',
    );

    await updatedUser.save();

    return updatedUser;
  }

  async acceptLisencesDriver(id: string, idLisences: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id, 'driverLisences.id': idLisences },
      { $set: { 'driverLisences.$.status': 'Đã xác minh' } },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    for (const itemLisences of updatedUser.driverLisences) {
      if (itemLisences.id === idLisences) {
        await sendEmail(
          updatedUser.email,
          templateEmailAcceptLisencesDriver(updatedUser.fullName, itemLisences.driverLisenceNumber, itemLisences.driverLisenceType),
          'Kết quả xét duyệt GPLX từ Shipmate',
        );
      }
    }

    return updatedUser;
  }

  async rejectLisencesDriver(id: string, idLisences: string, reason: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id, 'driverLisences.id': idLisences },
      { $set: { 'driverLisences.$.status': 'Không hợp lệ' } },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // send mail
    for (const itemLisences of updatedUser.driverLisences) {
      if (itemLisences.id === idLisences) {
        await sendEmail(
          updatedUser.email,
          templateEmailRejectLisencesDriver(updatedUser.fullName, itemLisences.driverLisenceNumber, itemLisences.driverLisenceType, reason),
          'Kết quả xét duyệt GPLX từ Shipmate',
        );
      }
    }

    return updatedUser;
  }

  async acceptVehiclesDriver(id: string, idVehicles: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id, 'vehicles.id': idVehicles },
      { $set: { 'vehicles.$.status': 'Đã xác minh' } },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    for (const itemVehicles of updatedUser.vehicles) {
      if (itemVehicles.id === idVehicles) {
        await sendEmail(
          updatedUser.email,
          templateEmailAcceptVehiclesDriver(updatedUser.fullName, itemVehicles.vehicleName, itemVehicles.lisencePlate, itemVehicles.cavetText),
          'Kết quả xét duyệt phương tiện từ Shipmate',
        );
      }
    }

    return updatedUser;
  }


  async rejectVehiclesDriver(id: string, idVehicles: string, reason: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id, 'vehicles.id': idVehicles },
      { $set: { 'vehicles.$.status': 'Không hợp lệ' } },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    for (const itemVehicles of updatedUser.vehicles) {
      if (itemVehicles.id === idVehicles) {
        itemVehicles.status = "Không hợp lệ";
        await sendEmail(
          updatedUser.email,
          templateEmailRejectVehiclesDriver(updatedUser.fullName, itemVehicles.vehicleName, itemVehicles.lisencePlate, itemVehicles.cavetText, reason),
          'Kết quả xét duyệt phương tiện từ Shipmate',
        );
      }
    }

    return updatedUser;
  }


}
