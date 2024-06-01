import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address, Addresschema } from './Schema/address.schema';
import { Model } from 'mongoose';
import { CreateAddressDTO } from './DTO/create_address.dto';
import { User } from 'src/schemas';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,

    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

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
}
