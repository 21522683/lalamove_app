import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { VehicleType } from './VehicleType.schema';
import * as  mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
// class vehicle
@Schema()
class Vehicle {
  @Prop()
  id: string;
  @Prop()
  vehicleName: string;
  @Prop()
  lisencePlate: string;
  @Prop()
  vehicleImage: string;
  @Prop({ required: true, type:  mongoose.Schema.Types.ObjectId, ref: 'VehicleType' })
  vehicleType: VehicleType | string;
  @Prop()
  cavetImage: string;
  @Prop()
  cavetText: string;
  @Prop()
  status: string;
}

// class driverLisence
class DriverLisence {
  @Prop()
  id: string;
  @Prop()
  driverLisenceNumber: string;
  @Prop()
  driverLisenceImage: string;
  @Prop()
  driverLisenceType: string;
  @Prop()
  status: string;
}

// user
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
    enum: ['Admin', 'User', 'Driver'],
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

  @Prop({
    default:
      'https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg',
    required: false,
  })
  avatar?: string;

  @Prop({ required: false })
  dob?: Date;

  @Prop({ required: false, type: [DriverLisence] })
  driverLisences?: DriverLisence[];

  @Prop({ required: false, type: [Vehicle] })
  vehicles?: Vehicle[];

  @Prop({ default: true, required: false })
  isWaitingAccepted?: boolean;

  @Prop({ required: false, default: false })
  isActive?: boolean;

  @Prop({ required: false, default: false })
  isLocked?: boolean;

  @Prop({ required: false })
  dateApproval?: Date;

  @Prop({ required: false })
  passwordResetToken?: string;

  @Prop({ required: false })
  passwordResetExpires?: Date;

  // method
  checkPassword: Function;
  createResetPassToken: Function;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
// method
UserSchema.method(
  'checkPassword',
  async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  },
);

UserSchema.method('createResetPassToken', function (otp: string) {
  this.passwordResetToken = otp;
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  this.passwordResetExpires = now;
});

export { UserSchema };
