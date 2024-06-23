import { Injectable } from '@nestjs/common';
import { Order } from './Schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateOrderDTO } from './DTO/create_order.dto';
import { getDaysInMonth } from 'src/utils/quantityDaysInMonth';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

  async addNewOrder(body: CreateOrderDTO) {
    const order = new this.orderModel(body);
    await order.save();
    return order;
  }

  // api của tui 
  // async getInfoReportDriver(driverId: string, query: any) {
  //   const { textSearch, option } = query;

  //   let pipeline: any[] = [
  //     {
  //       $lookup: {
  //         from: 'users',
  //         localField: 'customer',
  //         foreignField: '_id',
  //         as: 'customer',
  //       },
  //     },
  //     {
  //       $unwind: '$customer',
  //     },
  //     {
  //       $lookup: {
  //         from: 'users',
  //         localField: 'drive',
  //         foreignField: '_id',
  //         as: 'drive',
  //       },
  //     },
  //     {
  //       $unwind: '$drive'
  //     },
  //     {
  //       $match: {
  //         'drive._id': new mongoose.Types.ObjectId(driverId),
  //         status: 'Đã hoàn thành',
  //       },
  //     },
  //     {
  //       $addFields: {
  //         idString: { $toString: '$_id' },
  //       }
  //     }
  //   ];

  //   if (textSearch && textSearch.trim() !== '') {
  //     const searchConditions = {
  //       $or: [
  //         { idString: { $regex: new RegExp(textSearch, 'i') } },
  //         { 'customer.fullName': { $regex: textSearch, $options: 'i' } },
  //       ]
  //     };
  //     pipeline.push({
  //       $match: searchConditions
  //     });
  //   }

  //   try {
  //     const orders = await this.orderModel.aggregate(pipeline).exec();
  //     console.log("orders found: ", orders);
  //     return { orders };
  //   } catch (error) {
  //     console.error("Error retrieving orders:", error);
  //     throw new Error('Error retrieving orders');
  //   }
  // }


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
        let arrReport = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        let quantityDays = getDaysInMonth(currentMonth, currentYear);

        for (let i = 1; i <= quantityDays; i++) {
          const dailyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (
              orderDate.getDate() === i &&
              orderDate.getMonth() + 1 === currentMonth &&
              orderDate.getFullYear() === currentYear
            ) {
              return total + order.charge;
            }
            return total;
          }, 0);

          let temp = {
            label: "Ngày " + i.toString(),
            value: dailyTotal
          }

          arrReport.push(temp);
        }

        return { orders, arrReport };
      } catch (error) {
        console.error("Error retrieving orders:", error);
        throw new Error('Error retrieving orders');
      }
    }

    if (option === 'Theo tháng') {
      try {
        const orders = await this.orderModel.aggregate(pipeline).exec();
        let arrReport = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        for (let i = 1; i <= 12; i++) {
          const dailyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (
              orderDate.getMonth() + 1 === i &&
              orderDate.getFullYear() === currentYear
            ) {
              return total + order.charge;
            }
            return total;
          }, 0);
          let temp = {
            label: "Tháng " + i.toString(),
            value: dailyTotal
          }

          arrReport.push(temp);
        }

        return { orders, arrReport };
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

        let arrReport = Array.from(yearSet).sort().map(year => {
          const yearlyTotal = orders.reduce((total, order) => {
            const orderDate = new Date(order.date);
            if (orderDate.getFullYear() === year) {
              return total + order.charge;
            }
            return total;
          }, 0);

          return { label: year, value: yearlyTotal };
        });

        return { orders, arrReport };
      } catch (error) {
        console.error("Error retrieving orders:", error);
        throw new Error('Error retrieving orders');
      }
    }
  }

}

