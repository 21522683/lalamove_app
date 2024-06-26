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
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDTO } from './DTO/create_vehicle_type.dto copy';
import { Response } from 'express';

@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Get()
  welcome(@Req() req) {
    return 'Welcome';
  }

  @Post('')
  async addNewVehicleType(@Req() req, @Body() body, @Res() res: Response) {
    try {
      const { sub: userId } = req.user;
      const newVehicleType = await this.vehicleTypeService.addNewVehicleType(
        userId,
        body,
      );
      res.status(HttpStatus.CREATED).json({
        message: 'Add new vehicle type successfully',
        data: newVehicleType,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Patch(':vehicleTypeId')
  async updateNewVehicleType(
    @Param('vehicleTypeId') vehicleTypeId: string,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const vehicleType = await this.vehicleTypeService.updateNewVehicleType(
        vehicleTypeId,
        body,
      );
      res.status(HttpStatus.OK).json({
        message: 'Update vehicle type successfully',
        data: vehicleType,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('getVehicleTypes')
  async getVehicleTypes(@Res() res: Response) {
    try {
      const vehicleTypes = await this.vehicleTypeService.getVehicleTypes();
      res.status(HttpStatus.CREATED).json({
        message: 'Get vehicle type successfully',
        data: vehicleTypes,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
