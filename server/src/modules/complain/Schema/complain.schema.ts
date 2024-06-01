import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order } from 'src/modules/order/Schema/order.schema';
import { User } from 'src/schemas';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Complain {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop()
  content?: string;

  @Prop()
  response?: string;

  @Prop({
    default: false,
  })
  isResponsed: boolean;

  @Prop()
  images?: string[];

  @Prop({
    default: new Date(),
  })
  complainDate?: Date;

  @Prop({
    default: new Date(),
  })
  responseDate?: Date;
}

export const Complainchema = SchemaFactory.createForClass(Complain);
