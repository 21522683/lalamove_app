import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { VehicleType } from './VehicleType.schema';
import { Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'

// class vehicle
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

// class driverLisence
@Schema() // will create _id filed
class DriverLisence {
  driverLisenceNumber: string;
  driverLisenceImage: string;
  driverLisenceType: string;
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

  @Prop({ default: '', required: false })
  avatar?: string;

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

  @Prop({ required: false })
  passwordResetToken?: string;

  @Prop({ required: false })
  passwordResetExpires?: Date;


  // method
  checkPassword:Function;
  createResetPassToken:Function;


}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
// method
UserSchema.method("checkPassword", async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
});

UserSchema.method("createResetPassToken", function (otp : string) {
  
  this.passwordResetToken = otp;
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);
  this.passwordResetExpires =  now;
 
});

export { UserSchema };