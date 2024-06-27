import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/schemas';
import { Order } from './order.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order?: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  drive?: User;
  
  @Prop()
  star: number;

  @Prop()
  content: string;

  @Prop({
    default: new Date(),
  })
  date?: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
