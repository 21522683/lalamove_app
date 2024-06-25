import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Params {
 
  @Prop({ default: 0.8, required: true })
  hoaHongChoTaiXe: number;

}
export const ParamsSchema = SchemaFactory.createForClass(Params);
