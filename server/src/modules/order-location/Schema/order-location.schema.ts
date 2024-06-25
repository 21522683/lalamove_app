import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order } from 'src/modules/order/Schema/order.schema';
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class OrderLocation {
  @Prop()
  latitude?: number;

  @Prop()
  longitude?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;
}

export const OrderLocationSchema = SchemaFactory.createForClass(OrderLocation);
