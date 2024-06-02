import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateAddressDTO } from './DTO/create_address.dto';
import { AddressService } from './address.service';
import { Response } from 'express';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  welcome(@Req() req) {
    return 'Welcome';
  }

  @Post('addNewAddress')
  async addNewAddress(
    @Req() req,
    @Body() body: CreateAddressDTO,
    @Res() res: Response,
  ) {
    try {
      const { username: phoneNumber } = req.user;
      const newAddress = await this.addressService.addNewAddress(
        phoneNumber,
        body,
      );
      res.status(HttpStatus.CREATED).json({
        message: 'Add new address successfully',
        data: newAddress,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Patch('updateAddress/:addressId')
  async updateAddress(
    @Param('addressId') addressId: string,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const address = await this.addressService.updateAddress(addressId, body);
      res.status(HttpStatus.CREATED).json({
        message: 'Update new address successfully',
        data: address,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('deleteAddress/:addressId')
  async deleteAddress(
    @Param('addressId') addressId: string,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const address = await this.addressService.deleteAddress(addressId);
      res.status(HttpStatus.OK).json({
        message: 'Delete  address successfully',
        data: address,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('getAddressOfCurrentUser')
  async getAddressOfCurrentUser(@Req() req, @Res() res: Response) {
    try {
      const userId: string = req.user.sub;
      const addresses =
        await this.addressService.getAddressesOfCurrentUser(userId);
      res.status(HttpStatus.CREATED).json({
        message: 'Get addresses successfully',
        data: addresses,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
