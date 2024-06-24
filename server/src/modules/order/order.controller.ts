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
import { UpdateHoaHongDTO } from './DTO/update_hoa_hong.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

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

  @Get('/get-info-report-driver/:id')
  async getInfoReportDriver(@Param('id') id: string, @Query() query: any) {
    return this.orderService.getInfoReportDriver(id, query);
  }

  @Get('/get-info-report-admin')
  async getInfoReportAdmin(@Query() query: any) {
    return this.orderService.getInfoReportAdmin(query);
  }

  @Put('/update-hoa-hong')
  async updateHoaHong(@Body() body: UpdateHoaHongDTO) {
    return this.orderService.updateHoaHong(body);
  }

  @Get('/get-info-order/:id')
  async getInfoOrderById(@Param('id') id: string) {
    return this.orderService.getInfoOrderById(id);
  }

}
