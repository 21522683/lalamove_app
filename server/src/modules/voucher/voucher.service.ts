import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoucherDto } from 'src/dtos';
import { Voucher } from 'src/schemas';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
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
}
