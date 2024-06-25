import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateAddressDTO } from './DTO/create_address.dto';
import { AddressService } from './address.service';
import { Response, query } from 'express';

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

  @Get('getDefaultAddress')
  async getDefaultAddress(@Req() req, @Res() res: Response) {
    try {
      const userId: string = req.user.sub;
      const address = await this.addressService.getDefaultAddress(userId);

      res.status(HttpStatus.OK).json({
        message: 'Get default addresses successfully',
        data: address,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Patch(':id/defaultAddress')
  async changeDefaultAddress(
    @Req() req,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const userId: string = req.user.sub;
      console.log(userId);
      const address = await this.addressService.changeDefaultAddress(
        userId,
        id,
      );

      res.status(HttpStatus.OK).json({
        message: 'Change default addresses successfully',
        data: address,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
