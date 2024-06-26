import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { OrderLocationService } from './order-location.service';
import { CreateOrderLocationDTO } from './DTO/create-order-location.dto';
import { Response } from 'express';
@Controller('order-location')
export class OrderLocationController {
  constructor(private readonly orderLocationService: OrderLocationService) {}

  @Post('addNewOrderLocation')
  async addNewOrderLocation(
    @Req() req,
    @Body() body: CreateOrderLocationDTO,
    @Res() res: Response,
  ) {
    try {
      const newOrderLocation =
        await this.orderLocationService.addNewOrderLocation({
          ...body,
        });
      res.status(HttpStatus.CREATED).json({
        message: 'Add new order location successfully',
        data: newOrderLocation,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Put('updateOrderLocation')
  async updateOrderLocation(
    @Query() query,
    @Body() body: CreateOrderLocationDTO,
    @Res() res: Response,
  ) {
    try {
      const id = query.id;
      const response = await this.orderLocationService.updateOrderLocation(id, {
        ...body,
      });
      res.status(HttpStatus.OK).json({
        message: 'Update order location successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('getOrderLocation')
  async getOrderLocation(@Query() query, @Res() res: Response) {
    try {
      const id = query.id;
      const response = await this.orderLocationService.getOrderLocation(id);
      res.status(HttpStatus.OK).json({
        message: 'Get order location successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('deleteOrderLocation')
  async deleteOrderLocation(@Query() query, @Res() res: Response) {
    try {
      const id = query.id;
      const response = await this.orderLocationService.deleteOrderLocation(id);
      res.status(HttpStatus.OK).json({
        message: 'Delete order location successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
