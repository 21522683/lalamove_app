import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  province?: string;

  @Prop()
  district?: string;

  @Prop()
  ward?: string;

  @Prop()
  detail?: string;

  @Prop({
    default: false,
  })
  isDefault: boolean;

  @Prop()
  phoneNumber?: string;

  @Prop()
  latitude?: number;

  @Prop()
  longtitude?: number;
}

export const Addresschema = SchemaFactory.createForClass(Address);
