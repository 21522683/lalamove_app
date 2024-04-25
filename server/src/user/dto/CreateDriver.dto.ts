import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDriver {
  // init
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  // step 1
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userType: string;

  @IsString()
  @IsNotEmpty()
  CCCD: string;

  @IsString()
  @IsNotEmpty()
  Address: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  dob: Date;

  // step 3
  @IsNotEmpty()
  driverLisenceNumber: string;
  @IsNotEmpty()
  driverLisenceImage: string;
  @IsNotEmpty()
  driverLisenceType: string;
  @IsNotEmpty()
  avatar: string;
  @IsNotEmpty()
  CCCDImage: string;

  //step 2
  @IsNotEmpty()
  vehicleName: string;
  @IsNotEmpty()
  lisencePlate: string;
  @IsNotEmpty()
  vehicleImage: string;
  @IsNotEmpty()
  cavetImage: string;
  @IsNotEmpty()
  cavetText: string;
  @IsNotEmpty()
  vehicleTypeId: string;
}
