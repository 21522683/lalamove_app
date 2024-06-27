import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Voucher, VoucherSchema } from 'src/schemas';
import { Order, Orderchema } from '../order/Schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Voucher.name,
        schema: VoucherSchema,
      },
      {
        name: Order.name,
        schema: Orderchema,
      },
    ]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
