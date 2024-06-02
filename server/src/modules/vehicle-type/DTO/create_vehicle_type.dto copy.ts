import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVehicleTypeDTO {
  @IsString()
  @IsNotEmpty()
  vehicleTypeName: string;

  @IsString()
  @IsNotEmpty()
  mount: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @IsNotEmpty()
  minPrice: Number;

  @IsNumber()
  @IsNotEmpty()
  minLength: Number;

  @IsNumber()
  @IsNotEmpty()
  priceAddIfOut: Number;

  @IsString()
  @IsNotEmpty()
  suitableFor: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  status: string;
}
