import { Injectable } from '@nestjs/common';
import { OrderLocation } from './Schema/order-location.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderLocationDTO } from './DTO/create-order-location.dto';
import { UpdateOrderLocationDTO } from './DTO/update-order-location.dto';

@Injectable()
export class OrderLocationService {
  constructor(
    @InjectModel(OrderLocation.name)
    private orderLocationModel: Model<OrderLocation>,
  ) {}

  async addNewOrderLocation(body: CreateOrderLocationDTO) {
    const order = new this.orderLocationModel(body);
    await order.save();
    return order;
  }

  async updateOrderLocation(
    orderLocationId: string,
    body: UpdateOrderLocationDTO,
  ) {
    return this.orderLocationModel.findOneAndUpdate(
      { _id: orderLocationId },
      { $set: body },
      { new: true },
    );
  }

  async getOrderLocation(id: string) {
    return this.orderLocationModel.findOne({
      order: id,
    });
  }

  async deleteOrderLocation(id: string) {
    return this.orderLocationModel.deleteOne({
      _id: id,
    });
  }
}
