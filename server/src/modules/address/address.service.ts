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

  async getDefaultAddress(userId: string) {
    return await this.addressModel.findOne({
      user: userId,
      isDefault: true,
    });
  }

  async changeDefaultAddress(userId: string, addressId: string) {
    const defaultAddress = await this.addressModel.findOne({
      user: userId,
      isDefault: true,
    });

    if (defaultAddress) {
      defaultAddress.isDefault = false;
      await defaultAddress.save();
    }

    return await this.addressModel.findByIdAndUpdate(addressId, {
      isDefault: true,
    });
  }
  async addNewAddress(userId: string, address: CreateAddressDTO) {
    if (address.isDefault) {
      const defaultAddress = await this.addressModel.findOne({
        user: userId,
        isDefault: true,
      });

      if (defaultAddress) {
        defaultAddress.isDefault = false;
        await defaultAddress.save();
      }
    }
    const newAddress = new this.addressModel({
      ...address,
      user: userId,
    });
    return await newAddress.save();
  }

  async editAddress(
    userId: string,
    addressId: string,
    address: CreateAddressDTO,
  ) {
    if (address.isDefault) {
      const defaultAddress = await this.addressModel.findOne({
        user: userId,
        isDefault: true,
      });

      if (defaultAddress) {
        defaultAddress.isDefault = false;
        await defaultAddress.save();
      }
    }

    return await this.addressModel.findByIdAndUpdate(addressId, address);
  }
}
