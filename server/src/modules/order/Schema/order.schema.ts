import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
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

  @Prop(
    raw({
      addressString: {
        type: String,
      },
      fullName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      detail: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    }),
  )
  sourceAddress: Record<string, any>;
  @Prop(
    raw({
      addressString: {
        type: String,
      },
      fullName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      detail: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    }),
  )
  destinationAddress: Record<string, any>;

  @Prop({
    default: 'Đang chờ nhận', // Giao hoàn thành - Đang giao 
  })
  status: string;

  @Prop()
  charge?: number;

  @Prop()
  goodsType?: string;

  @Prop()
  goodsImage: string;

  @Prop()
  note?: string;

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
