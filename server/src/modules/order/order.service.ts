import { BadRequestException, Injectable } from '@nestjs/common';
import { Order } from './Schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './DTO/create_order.dto';
import { User } from 'src/schemas';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async addNewOrder(body: CreateOrderDTO) {
    const order = new this.orderModel(body);
    await order.save();
    return order;
  }

  // get all pending orders in driver module 
  async getAllPendingOrders() {
    return this.orderModel.find({
      status: 'Đang chờ nhận',
    })
      .populate(['vehicleType', 'sourceAddress', 'destinationAddress'])
      .exec();
  }

  // get all orders of (user, driver) (in user module and driver module )
  async getAllUserOrders(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return [];
    }
    if (user.userType === 'Driver') {
      return this.orderModel.find({ drive: user._id })
        .populate(['vehicleType', 'sourceAddress', 'destinationAddress'])
        .exec();
    }
    return this.orderModel.find({ customer: user._id })
      .populate(['vehicleType', 'sourceAddress', 'destinationAddress'])
      .exec();
  }

  // driver receive/ cancel/ completed order => save field drive + status
  async updateStatusOrder(orderId: string, action: string, driverId?: string) {
    enum Action {
      RECEIVE = "Recieve",
      UNRECEIVE = "UnRecieve",
      DELIVERING = 'Delivering',
      COMPLETED = 'Completed',
      CANCEL = 'Cancel',
    };
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new BadRequestException('Đơn hàng không tồn tại.');
    }
    const updateData = {} as any;

    switch (action) {
      case Action.RECEIVE:
        updateData.drive = driverId;
        updateData.status = 'Đã nhận đơn';
        break;
      case Action.UNRECEIVE:
        updateData.drive = null;
        updateData.status = 'Đang chờ nhận';
        break;
      case Action.DELIVERING:
        updateData.status = 'Đang giao hàng';
        break;
      case Action.COMPLETED:
        updateData.status = 'Đã hoàn thành';
        break;
      case Action.CANCEL:
        updateData.drive = null;
        updateData.status = 'Đã huỷ';
        break;
      default:
        throw new BadRequestException('Action không tồn tại.');
    }

    return await this.orderModel.findByIdAndUpdate(
      orderId,
      { ...updateData },
      { new: true },
    );
  }




}
