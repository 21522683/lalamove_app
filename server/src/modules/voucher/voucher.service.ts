import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoucherDto } from 'src/dtos';
import { Voucher } from 'src/schemas';
import * as moment from 'moment';
import { Order } from '../order/Schema/order.schema';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}
  public async addVoucher(voucherDto: VoucherDto) {
    try {
      const existedVoucher = await this.voucherModel.findOne({
        voucherCode: voucherDto?.voucherCode,
      });
      const currentDate = new Date();
      if (
        existedVoucher &&
        existedVoucher.expiredDate > currentDate &&
        existedVoucher.quality > 0
      )
        throw new BadRequestException(
          'Mã giảm giá đã tồn tại và đang được phát hành. Thử lại mã mới!',
        );
      const newVoucher = new this.voucherModel(voucherDto);
      return await newVoucher.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async updateVoucher(voucherDto: VoucherDto, voucherId: string) {
    try {
      const f = await this.voucherModel.findById(voucherId);
      if (!f) throw new BadRequestException('Not found');
      const existedVoucher = await this.voucherModel.findOne({
        voucherCode: voucherDto?.voucherCode,
      });
      const currentDate = new Date();
      if (
        existedVoucher &&
        existedVoucher.expiredDate > currentDate &&
        existedVoucher.quality > 0 &&
        existedVoucher.id !== voucherId
      )
        throw new BadRequestException(
          'Mã giảm giá đã tồn tại và đang được phát hành. Thử lại mã mới!',
        );
      return await this.voucherModel.findByIdAndUpdate(voucherId, {
        ...voucherDto,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async getAllVouchers() {
    try {
      return await this.voucherModel.find({});
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  public async deleteVoucher(voucherId: string) {
    try {
      return await this.voucherModel.findByIdAndDelete(voucherId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getVouchersByCustomer(
    userId: string,
    money: number,
  ): Promise<Voucher[]> {
    // Calculate date ranges
    const threeMonthsAgo = moment().subtract(3, 'months').toDate();
    const oneMonthAgo = moment().subtract(1, 'month').toDate();
    const today = new Date();

    // Count completed orders for the user
    const totalCompletedOrdersCount = await this.orderModel.countDocuments({
      customer: userId,
      status: 'Đã hoàn thành',
    });

    // Count completed orders in the last 3 months
    const recentThreeMonthsOrdersCount = await this.orderModel.countDocuments({
      customer: userId,
      status: 'Đã hoàn thành',
      updated_at: { $gte: threeMonthsAgo },
    });

    // Count completed orders in the last 1 month
    const recentOneMonthOrdersCount = await this.orderModel.countDocuments({
      customer: userId,
      status: 'Đã hoàn thành',
      updated_at: { $gte: oneMonthAgo },
    });

    // Determine applicable vouchers based on completed orders count
    let applyFor: string[] = [];

    if (totalCompletedOrdersCount < 3) {
      applyFor.push('Khách hàng mới');
    }
    if (recentThreeMonthsOrdersCount >= 5) {
      applyFor.push('Khách hàng trung thành');
    }
    if (recentOneMonthOrdersCount >= 3) {
      applyFor.push('Khách hàng tiềm năng');
    }

    const vouchers = await this.voucherModel.find({
      applyFor: { $in: applyFor },
      quality: { $gt: 0 },
      expiredDate: { $gte: today },
      minPrice: { $lte: money },
    });

    return vouchers;
  }
}
