import { Injectable } from '@nestjs/common';
import { Order } from './Schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateOrderDTO } from './DTO/create_order.dto';
import { getDaysInMonth } from 'src/utils/quantityDaysInMonth';
import { Params, User, VehicleType } from 'src/schemas';
import { UpdateHoaHongDTO } from './DTO/update_hoa_hong.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Params.name) private paramsModel: Model<Params>,
    @InjectModel(VehicleType.name) private readonly vehicleTypeModel: Model<VehicleType>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async addNewOrder(body: CreateOrderDTO) {
    const order = new this.orderModel(body);
    await order.save();
    return order;
  }

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
        $unwind: '$drive'
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
        }
      }
    ];

    if (textSearch && textSearch.trim() !== '') {
      const searchConditions = {
        $or: [
          { idString: { $regex: new RegExp(textSearch, 'i') } },
          { 'customer.fullName': { $regex: textSearch, $options: 'i' } },
        ]
      };
      pipeline.push({
        $match: searchConditions
      });
    }

    if (option === 'Theo ngày') {
      try {
        const orders = await this.orderModel.aggregate(pipeline).exec();
        let dataOfChart = {};
        let arrValueChart = [];
        let arrLabelChart = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        let quantityDays = getDaysInMonth(currentMonth, currentYear);

        let totalRevenue = 0;
        let totalOrderSuccess = 0;
        let arrOrder = [];
        for (let i = 1; i <= quantityDays; i++) {
          const dailyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (
              orderDate.getDate() === i &&
              orderDate.getMonth() + 1 === currentMonth &&
              orderDate.getFullYear() === currentYear
            ) {
              arrOrder.push(order);
              totalOrderSuccess = totalOrderSuccess + 1;
              totalRevenue += order.charge;

              return total + order.charge;
            }
            return total;
          }, 0);

          arrValueChart.push(dailyTotal);
          arrLabelChart.push(i.toString());
        }

        let totalOfSystem = 0;
        let totalOfDriver = 0;

        const params = await this.paramsModel.findOne().exec();
        totalOfDriver = totalRevenue * params.hoaHongChoTaiXe;
        totalOfSystem = totalRevenue - totalOfDriver;

        totalOfSystem = parseFloat(totalOfSystem.toFixed(1));
        totalOfDriver = parseFloat(totalOfDriver.toFixed(1));
        dataOfChart = {
          arrLabelChart,
          arrValueChart
        }
        return { orders: arrOrder, dataOfChart, totalOrderSuccess, totalRevenue, totalOfSystem, totalOfDriver };
      } catch (error) {
        console.error("Error retrieving orders:", error);
        throw new Error('Error retrieving orders');
      }
    }

    if (option === 'Theo tháng') {
      try {
        const orders = await this.orderModel.aggregate(pipeline).exec();
        let dataOfChart = {};
        let arrValueChart = [];
        let arrLabelChart = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        let totalRevenue = 0;
        let totalOrderSuccess = 0;
        let arrOrder = [];
        for (let i = 1; i <= 12; i++) {
          const dailyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (
              orderDate.getMonth() + 1 === i &&
              orderDate.getFullYear() === currentYear
            ) {
              arrOrder.push(order);
              totalOrderSuccess = totalOrderSuccess + 1;
              totalRevenue += order.charge;
              return total + order.charge;
            }
            return total;
          }, 0);

          arrValueChart.push(dailyTotal);
          arrLabelChart.push(i.toString());
        }
        let totalOfSystem = 0;
        let totalOfDriver = 0;

        const params = await this.paramsModel.findOne().exec();
        totalOfDriver = totalRevenue * params.hoaHongChoTaiXe;
        totalOfSystem = totalRevenue - totalOfDriver;

        totalOfSystem = parseFloat(totalOfSystem.toFixed(1));
        totalOfDriver = parseFloat(totalOfDriver.toFixed(1));
        dataOfChart = {
          arrLabelChart,
          arrValueChart
        }
        return { orders: arrOrder, dataOfChart, totalOrderSuccess, totalRevenue, totalOfSystem, totalOfDriver };

      } catch (error) {
        console.error("Error retrieving orders:", error);
        throw new Error('Error retrieving orders');
      }
    }

    if (option === 'Theo năm') {
      try {
        const orders = await this.orderModel.aggregate(pipeline).exec();
        let yearSet = new Set<number>();
        orders.forEach(order => {
          const orderDate = new Date(order.date);
          yearSet.add(orderDate.getFullYear());
        });

        let dataOfChart = {};
        let arrLabelChart = Array.from(yearSet).sort().map(year => {
          return year;
        });
        let arrValueChart = Array.from(yearSet).sort().map(year => {
          const yearlyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (orderDate.getFullYear() === year) {
              return total + order.charge;
            }
            return total;
          }, 0);

          return yearlyTotal;
        });

        let totalRevenue = 0;
        let totalOrderSuccess = orders.length;
        let totalOfSystem = 0;
        let totalOfDriver = 0;
        for (let i = 0; i < orders.length; i++) {
          totalRevenue += orders[i].charge;
        }

        const params = await this.paramsModel.findOne().exec();
        totalOfDriver = totalRevenue * params.hoaHongChoTaiXe;
        totalOfSystem = totalRevenue - totalOfDriver;

        totalOfSystem = parseFloat(totalOfSystem.toFixed(1));
        totalOfDriver = parseFloat(totalOfDriver.toFixed(1));
        dataOfChart = {
          arrLabelChart,
          arrValueChart
        }
        return { orders, dataOfChart, totalOrderSuccess, totalRevenue, totalOfSystem, totalOfDriver };
      } catch (error) {
        console.error("Error retrieving orders:", error);
        throw new Error('Error retrieving orders');
      }
    }
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
            if (orderDate.getDate() === i && orderDate.getMonth() + 1 === currentMonth && orderDate.getFullYear() === currentYear) {
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
            if (orderDate.getMonth() + 1 === i && orderDate.getFullYear() === currentYear) {
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
        const yearsSet = new Set<number>(orders.map(order => new Date(order.date).getFullYear()));
        const yearsArray = Array.from(yearsSet).sort();
  
        yearsArray.forEach(year => {
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
  
      let totalOfSystem = parseFloat((totalRevenue * (1 - params.hoaHongChoTaiXe)).toFixed(1));
      let totalOfDriver = parseFloat((totalRevenue * params.hoaHongChoTaiXe).toFixed(1));
  
      dataOfChart = { arrLabelChart, arrValueChart };
  
      let filter: any = { userType: 'Driver' };
      if (textSearch && textSearch.trim() !== '') {
        filter.fullName = { $regex: textSearch.trim(), $options: 'i' };
      }
  
      const listDrivers = await this.userModel.find(filter).populate({
        path: 'vehicles',
        populate: {
          path: 'vehicleType',
          model: this.vehicleTypeModel,
        },
      }).exec();
  
      return { dataOfChart, totalOrderSuccess, totalRevenue, totalOfSystem, totalOfDriver, hoaHong: params.hoaHongChoTaiXe, listDrivers };
    } catch (error) {
      console.error("Error retrieving orders:", error);
      throw new Error('Error retrieving orders');
    }
  }
  
  async updateHoaHong(body: UpdateHoaHongDTO) {
    const params = await this.paramsModel.findOne();
    params.hoaHongChoTaiXe = body.hoaHongChoTaiXe;
    await params.save();
    return params;
  }
  
}

