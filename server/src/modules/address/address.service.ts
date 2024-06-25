import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address, Addresschema } from './Schema/address.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreateAddressDTO } from './DTO/create_address.dto';
import { User } from 'src/schemas';
import { SetDefaultAddressDTO } from './DTO/set_default_address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,

    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async addNewAddress(phoneNumber: string, address: CreateAddressDTO) {
    const user = await this.userModel.findOne({
      phoneNumber: phoneNumber,
    });

    const newAddress = new this.addressModel({
      ...address,
      user: user.id,
    });
    return await newAddress.save();
  }

  async updateAddress(addressId: string, body: CreateAddressDTO) {
    return await this.addressModel.findByIdAndUpdate(addressId, body, {
      new: true,
    });
  }

  async deleteAddress(addressId: string) {
    return await this.addressModel.findByIdAndDelete(addressId);
  }

  async getAddressesOfCurrentUser(userId: string) {
    return await this.addressModel.find({
      user: userId,
    });
  }


  async setAddressDefault(id: string, body: SetDefaultAddressDTO) {
    const listAddressOfUser = await this.addressModel.find({
      user: body.userId,
    });

    if (listAddressOfUser.length > 0) {
      for (let i = 0; i < listAddressOfUser.length; i++) {
        if (listAddressOfUser[i].isDefault === true) {
          listAddressOfUser[i].isDefault = false;
          await listAddressOfUser[i].save();
        }
      }
      let res = await this.addressModel.findById({_id: new mongoose.Types.ObjectId(id)});
      res.isDefault = true;
      await res.save();

      return res;
    }
  }
  
  async deleteAddressSaved(id: string) {
      let res = await this.addressModel.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
      return res;
  }

}
