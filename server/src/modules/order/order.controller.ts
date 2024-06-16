import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './DTO/create_order.dto';
import { Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async getAllPendingOrders(@Res() res: Response) {
    try {
      const orders = await this.orderService.getAllPendingOrders();
      res.status(HttpStatus.OK).json({
        message: 'Get all pending orders successfully',
        data: orders,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
  @Get(":id/get-user-orders")
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

  @Put("update-status-order")
  async updateStatusOrder(@Body() body: any, @Res() res: Response) {
    try {
      const order = await this.orderService.updateStatusOrder(body.orderId, body.action, body.driverId);
      res.status(HttpStatus.OK).json({
        message: 'Update order status successfully',
        data: order,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
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
}
