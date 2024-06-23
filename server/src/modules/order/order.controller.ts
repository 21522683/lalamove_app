import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './DTO/create_order.dto';
import { Response, query } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  welcome(@Req() req) {
    return 'Welcome';
  }

  @Post('addNewOrder')
  async addNewOrder(
    @Req() req,
    @Body() body: CreateOrderDTO,
    @Res() res: Response,
  ) {
    try {
      const { sub: customer } = req.user;
      const newOrder = await this.orderService.addNewOrder({
        customer,
        ...body,
      });
      res.status(HttpStatus.CREATED).json({
        message: 'Add new order successfully',
        data: newOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get(':id/get-user-orders')
  async getAllUserOrders(@Param('id') id: string, @Res() res: Response) {
    try {
      const orders = await this.orderService.getAllUserOrders(id);
      res.status(HttpStatus.OK).json({
        message: 'Get all user orders successfully',
        data: orders,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('driver-orders')
  async driverOrders(@Query() query, @Res() res: Response) {
    try {
      const latitude = query.latitude;
      const longitude = query.longitude;
      const radius = query.radius;
      const orders = await this.orderService.driverOrders(
        latitude,
        longitude,
        radius,
      );
      res.status(HttpStatus.OK).json({
        message: 'Get all user orders successfully',
        data: orders,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
