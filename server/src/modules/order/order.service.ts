import { Injectable } from '@nestjs/common';
import { Order } from './Schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './DTO/create_order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async addNewOrder(body: CreateOrderDTO) {
    const order = new this.orderModel(body);
    await order.save();
    return order;
  }
}
