import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderLocationController } from './order-location.controller';
import { OrderLocationService } from './order-location.service';
import {
  OrderLocation,
  OrderLocationSchema,
} from './Schema/order-location.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderLocation.name,
        schema: OrderLocationSchema,
      },
    ]),
  ],
  controllers: [OrderLocationController],
  providers: [OrderLocationService],
})
export class OrderLocationModule {}
