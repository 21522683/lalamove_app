import { Injectable } from '@nestjs/common';
import { Order } from './Schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas';
import { CreateOrderDTO } from './DTO/create_order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async addNewOrder(body: CreateOrderDTO) {
    const order = new this.orderModel(body);
    await order.save();
    return order;
  }

  async getAllUserOrders(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return [];
    }
    if (user.userType === 'Driver') {
      return await this.orderModel
        .find({ drive: user._id })
        .populate(['vehicleType'])
        .exec();
    }
    return await this.orderModel
      .find({ customer: user._id })
      .populate(['vehicleType'])
      .exec();
  }

  async getAllOrder() {
    const orders = await this.orderModel
      .find()
      .populate(['vehicleType', 'customer'])
      .exec();
    return orders;
  }

  async driverOrders(latitude: number, longitude: number, radius: number) {
    const orders = await this.getAllOrder();
    return orders
      .map((order) => {
        return {
          ...order['_doc'],
          distance: this.haversineDistance(
            order.sourceAddress.latitude,
            order.sourceAddress.longitude,
            latitude,
            longitude,
          ),
        };
      })
      .filter((item) => item.distance < radius);
  }

  haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const toRadians = (angle) => angle * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };
}
