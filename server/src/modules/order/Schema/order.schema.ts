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

  @Prop()
  sourceAddress: Address;

  @Prop()
  destinationAddress: Address;

  @Prop({
    default: 'Đang chờ nhận',
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

  @Prop()
  receivedDate?: Date;

  @Prop()
  deliveryDate?: Date;

  @Prop()
  finishedDate?: Date;

  @Prop()
  cancelledDate?: Date;

  @Prop()
  verifyImage?: string;
}

export const Orderchema = SchemaFactory.createForClass(Order);
