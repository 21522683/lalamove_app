import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class VehicleType {
  @Prop({ unique: true, required: true })
  vehicleTypeName: string;

  @Prop({ required: true })
  mount: string;

  @Prop({ required: true })
  size: string;

  @Prop({ default: '', required: true })
  minPrice: number;

  @Prop({ default: '', required: true })
  minLength: number;

  @Prop({ default: '', required: true })
  priceAddIfOut: number;

  @Prop({ default: '', required: true })
  suitableFor: string;

  @Prop({ required: true })
  note: string;
}
export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType);
