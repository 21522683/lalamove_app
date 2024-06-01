import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class VehicleType {
  @Prop({ unique: true, required: true })
  vehicleTypeName: string;

  @Prop({ required: true })
  mount: string;

  @Prop({ required: true })
  size: string;

  @Prop({ default: '', required: true })
  minPrice: Number;

  @Prop({ default: '', required: true })
  minLength: Number;

  @Prop({ default: '', required: true })
  priceAddIfOut: Number;

  @Prop({ default: '', required: true })
  suitableFor: string;

  @Prop({ default: '', required: true })
  image: string;

  @Prop({ required: true })
  note: string;

  @Prop({ default: 'Đang hoạt động', required: true })
  status: string;
}

export const VehicleTypechema = SchemaFactory.createForClass(VehicleType);
