import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, Orderchema } from './Schema/order.schema';
import {
  Params,
  ParamsSchema,
  User,
  UserSchema,
  VehicleType,
  VehicleTypeSchema,
  Voucher,
  VoucherSchema,
} from 'src/schemas';
import { Complain, Complainchema } from '../complain/Schema/complain.schema';
import { Review, ReviewSchema } from './Schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: Orderchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Voucher.name,
        schema: VoucherSchema,
      },
      {
        name: Complain.name,
        schema: Complainchema,
      },
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Params.name,
        schema: ParamsSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: VehicleType.name,
        schema: VehicleTypeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Params.name,
        schema: ParamsSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: VehicleType.name,
        schema: VehicleTypeSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
