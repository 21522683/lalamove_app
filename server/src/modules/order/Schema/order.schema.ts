import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Address } from 'src/modules/address/Schema/address.schema';
import { User } from 'src/schemas';
import { VehicleType } from 'src/schemas/VehicleType.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  drive?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType' })
  vehicleType: VehicleType;

  @Prop()
  shortDescription?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  sourceAddress: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  destinationAddress: Address;

  @Prop({
    default: 'Đang chờ nhận', // Giao hoàn thành - Đang giao 
  })
  status: string;

  @Prop()
  charge?: number;

  @Prop()
  discountPrice?: number;

  @Prop({
    default: new Date(),
  })
  date?: Date;
}

export const Orderchema = SchemaFactory.createForClass(Order);
