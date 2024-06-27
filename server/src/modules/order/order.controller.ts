import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './DTO/create_order.dto';
import { Response } from 'express';
import { Public } from '../auth/authPublic.decorator';

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

  @Public()
  @Put(':driverId/driver-receive-order/:orderId')
  async driverReceiveOrder(
    @Param('driverId') driverId: string,
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const order = await this.orderService.driverReceiveOrder(
        driverId,
        orderId,
      );
      res.status(HttpStatus.OK).json({
        message: 'Update driver order successfully',
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Public()
  @Put(':driverId/driver-delivery-order/:orderId')
  async driverDeliveryOrder(
    @Param('driverId') driverId: string,
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const order = await this.orderService.driverDeliveryOrder(
        driverId,
        orderId,
      );
      res.status(HttpStatus.OK).json({
        message: 'Update driver order successfully',
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Public()
  @Put(':driverId/driver-finish-order/:orderId')
  async driverFinishOrder(
    @Param('driverId') driverId: string,
    @Param('orderId') orderId: string,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const order = await this.orderService.driverFinishOrder(
        driverId,
        orderId,
        body,
      );
      res.status(HttpStatus.OK).json({
        message: 'Update driver order successfully',
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Public()
  @Put('driver-cancel-order/:orderId')
  async driverCancelOrder(
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const order = await this.orderService.driverCancelOrder(orderId);
      res.status(HttpStatus.OK).json({
        message: 'Update driver order successfully',
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Public()
  @Put('user-cancel-order/:orderId')
  async userCancelOrder(
    @Param('orderId') orderId: string,
    @Res() res: Response,
  ) {
    try {
      const order = await this.orderService.userCancelOrder(orderId);
      res.status(HttpStatus.OK).json({
        message: 'Update user order successfully',
        data: order,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
