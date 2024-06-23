import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
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
      console.log('đáoadìoiádòa');
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
