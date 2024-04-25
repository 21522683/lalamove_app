import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { USER_TYPE } from 'src/constants';
import { VehicleType } from './VehicleType.schema';
import { Types } from 'mongoose';
@Schema() // will create _id filed
class Vehicle {
  vehicleName: string;
  lisencePlate: string;
  vehicleImage: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'VehicleType' })
  vehicleType?: VehicleType;
  cavetImage: string;
  cavetText: string;
}
@Schema() // will create _id filed
class DriverLisence {
  driverLisenceNumber: string;
  driverLisenceImage: string;
  driverLisenceType: string;
}
@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  password: string;

  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,
    immutable: true,
    enum: Object.keys(USER_TYPE),
  })
  userType: string;

  @Prop({ default: '', required: false })
  fullName?: string;

  @Prop({ default: '', required: false })
  CCCDText?: string;

  @Prop({ default: '', required: false })
  CCCDImage?: string;

  @Prop({ default: '', required: false })
  address?: string;

  @Prop({ required: false })
  dob?: Date;

  @Prop({ required: false, type: [DriverLisence] })
  driverLisences?: DriverLisence[];

  @Prop({ required: false, type: [Vehicle] })
  vehicles?: Vehicle[];
  
  @Prop({ default: true, required: false })
  isWaitingAccepted?: boolean;

  @Prop({ required: false })
  isActive?: boolean;

  @Prop({ required: false })
  dateApproval?: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
