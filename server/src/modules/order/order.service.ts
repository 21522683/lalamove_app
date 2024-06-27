import { Injectable } from '@nestjs/common';
import { Order } from './Schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateOrderDTO } from './DTO/create_order.dto';
import { getDaysInMonth } from 'src/utils/quantityDaysInMonth';
import { Params, User, VehicleType, Voucher } from 'src/schemas';
import { UpdateHoaHongDTO } from './DTO/update_hoa_hong.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Params.name) private paramsModel: Model<Params>,
    @InjectModel(VehicleType.name)
    private readonly vehicleTypeModel: Model<VehicleType>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
  ) {}

  async addNewOrder(customer: string, body: CreateOrderDTO) {
    if (body.voucherId) {
      const voucher = await this.voucherModel.findById(body.voucherId);
      voucher.quality--;
      await voucher.save();
      delete body.voucherId;
    }
    const order = new this.orderModel({
      customer,
      ...body,
    });
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

  async getInfoReportDriver(driverId: string, query: any) {
    const { textSearch, option } = query;

    let pipeline: any[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'customer',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $unwind: '$customer',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'drive',
          foreignField: '_id',
          as: 'drive',
        },
      },
      {
        $unwind: '$drive',
      },
      {
        $match: {
          'drive._id': new mongoose.Types.ObjectId(driverId),
          status: 'Đã hoàn thành',
        },
      },
      {
        $addFields: {
          idString: { $toString: '$_id' },
        },
      },
    ];

    if (textSearch && textSearch.trim() !== '') {
      const searchConditions = {
        $or: [
          { idString: { $regex: new RegExp(textSearch, 'i') } },
          { 'customer.fullName': { $regex: textSearch, $options: 'i' } },
        ],
      };
      pipeline.push({
        $match: searchConditions,
      });
    }

    const orders = await this.orderModel.aggregate(pipeline).exec();

    const params = await this.paramsModel.findOne().exec();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let dataOfChart = {};
    let arrValueChart = [];
    let arrLabelChart = [];
    let totalRevenue = 0;
    let totalOrderSuccess = 0;

    if (option === 'Theo ngày') {
      let quantityDays = getDaysInMonth(currentMonth, currentYear);
      let dailyRevenue = new Array(quantityDays).fill(0);

      orders.forEach((order) => {
        const orderDate = new Date(order.date);
        if (
          orderDate.getMonth() + 1 === currentMonth &&
          orderDate.getFullYear() === currentYear
        ) {
          const day = orderDate.getDate();
          dailyRevenue[day - 1] += order.charge;
          totalOrderSuccess++;
          totalRevenue += order.charge;
        }
      });

      arrLabelChart = Array.from({ length: quantityDays }, (_, i) =>
        (i + 1).toString(),
      );
      arrValueChart = dailyRevenue;
    } else if (option === 'Theo tháng') {
      let monthlyRevenue = new Array(12).fill(0);

      orders.forEach((order) => {
        const orderDate = new Date(order.date);
        if (orderDate.getFullYear() === currentYear) {
          const month = orderDate.getMonth();
          monthlyRevenue[month] += order.charge;
          totalOrderSuccess++;
          totalRevenue += order.charge;
        }
      });

      arrLabelChart = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
      arrValueChart = monthlyRevenue;
    } else if (option === 'Theo năm') {
      let yearlyRevenue = {};

      orders.forEach((order) => {
        const orderDate = new Date(order.date);
        const year = orderDate.getFullYear();
        if (!yearlyRevenue[year]) yearlyRevenue[year] = 0;
        yearlyRevenue[year] += order.charge;
        totalOrderSuccess++;
        totalRevenue += order.charge;
      });

      arrLabelChart = Object.keys(yearlyRevenue).sort();
      arrValueChart = arrLabelChart.map((year) => yearlyRevenue[year]);
    }

    const totalOfDriver = parseFloat(
      (totalRevenue * params.hoaHongChoTaiXe).toFixed(1),
    );
    const totalOfSystem = parseFloat((totalRevenue - totalOfDriver).toFixed(1));

    dataOfChart = {
      arrLabelChart,
      arrValueChart,
    };

    const infoDriver = await this.userModel.findById({ _id: driverId }).exec();

    return {
      orders,
      dataOfChart,
      totalOrderSuccess,
      totalRevenue,
      totalOfSystem,
      totalOfDriver,
      infoDriver,
    };
  }

  async getInfoReportAdmin(query: any) {
    const { textSearch, option } = query;

    const pipeline: any[] = [
      {
        $lookup: {
          from: 'users',
          localField: 'customer',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $unwind: '$customer',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'drive',
          foreignField: '_id',
          as: 'drive',
        },
      },
      {
        $unwind: '$drive',
      },
      {
        $match: {
          status: 'Đã hoàn thành',
        },
      },
    ];

    try {
      const orders = await this.orderModel.aggregate(pipeline).exec();

      let dataOfChart = {};
      let arrValueChart = [];
      let arrLabelChart = [];
      let totalRevenue = 0;
      let totalOrderSuccess = 0;
      let arrOrder = [];
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const params = await this.paramsModel.findOne().exec();

      if (option === 'Theo ngày') {
        const currentMonth = currentDate.getMonth() + 1;
        const quantityDays = getDaysInMonth(currentMonth, currentYear);

        for (let i = 1; i <= quantityDays; i++) {
          const dailyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (
              orderDate.getDate() === i &&
              orderDate.getMonth() + 1 === currentMonth &&
              orderDate.getFullYear() === currentYear
            ) {
              arrOrder.push(order);
              totalOrderSuccess++;
              totalRevenue += order.charge;
              return total + order.charge;
            }
            return total;
          }, 0);

          arrValueChart.push(dailyTotal);
          arrLabelChart.push(i.toString());
        }
      } else if (option === 'Theo tháng') {
        for (let i = 1; i <= 12; i++) {
          const monthlyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (
              orderDate.getMonth() + 1 === i &&
              orderDate.getFullYear() === currentYear
            ) {
              arrOrder.push(order);
              totalOrderSuccess++;
              totalRevenue += order.charge;
              return total + order.charge;
            }
            return total;
          }, 0);

          arrValueChart.push(monthlyTotal);
          arrLabelChart.push(i.toString());
        }
      } else if (option === 'Theo năm') {
        const yearsSet = new Set<number>(
          orders.map((order) => new Date(order.date).getFullYear()),
        );
        const yearsArray = Array.from(yearsSet).sort();

        yearsArray.forEach((year) => {
          const yearlyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (orderDate.getFullYear() === year) {
              totalOrderSuccess++;
              totalRevenue += order.charge;
              return total + order.charge;
            }
            return total;
          }, 0);

          arrValueChart.push(yearlyTotal);
          arrLabelChart.push(year.toString());
        });
      }

      let totalOfSystem = parseFloat(
        (totalRevenue * (1 - params.hoaHongChoTaiXe)).toFixed(1),
      );
      let totalOfDriver = parseFloat(
        (totalRevenue * params.hoaHongChoTaiXe).toFixed(1),
      );

      dataOfChart = { arrLabelChart, arrValueChart };

      let filter: any = { userType: 'Driver' };
      if (textSearch && textSearch.trim() !== '') {
        filter.fullName = { $regex: textSearch.trim(), $options: 'i' };
      }

      const listDrivers = await this.userModel
        .find(filter)
        .populate({
          path: 'vehicles',
          populate: {
            path: 'vehicleType',
            model: this.vehicleTypeModel,
          },
        })
        .exec();

      return {
        dataOfChart,
        totalOrderSuccess,
        totalRevenue,
        totalOfSystem,
        totalOfDriver,
        hoaHong: params.hoaHongChoTaiXe,
        listDrivers,
      };
    } catch (error) {
      console.error('Error retrieving orders:', error);
      throw new Error('Error retrieving orders');
    }
  }

  async updateHoaHong(body: UpdateHoaHongDTO) {
    const params = await this.paramsModel.findOne();
    params.hoaHongChoTaiXe = body.hoaHongChoTaiXe;
    await params.save();
    return params;
  }

  async getInfoOrderById(idOrder: string) {
    const pipeline = [
      {
        $lookup: {
          from: 'users',
          localField: 'customer',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $unwind: '$customer',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'drive',
          foreignField: '_id',
          as: 'drive',
        },
      },
      {
        $unwind: '$drive',
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(idOrder),
        },
      },
    ];

    try {
      const orderArray = await this.orderModel.aggregate(pipeline).exec();
      if (orderArray.length === 0) {
        throw new Error('Order not found');
      }
      const order = orderArray[0];
      return order;
    } catch (error) {
      console.error('Error retrieving orders:', error);
      throw new Error('Error retrieving orders');
    }
  }
}
