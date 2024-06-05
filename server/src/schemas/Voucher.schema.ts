import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Voucher {
  @Prop({ unique: true, required: true })
  voucherCode: string;

  @Prop({ required: true })
  voucherPrice: number;

  @Prop({ required: true })
  isPercent: boolean;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  expiredDate: Date;

  @Prop({ required: true })
  minPrice: number;

  @Prop({ default: 100, required: true })
  quality: number;

  @Prop({ required: true })
  applyFor: string;

  @Prop({ required: true })
  description: string;
}
export const VoucherSchema = SchemaFactory.createForClass(Voucher);
