import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleTypeDTO {
  @IsOptional()
  vehicleTypeName: string;

  @IsOptional()
  mount: string;

  @IsOptional()
  size: string;

  @IsOptional()
  minPrice: Number;

  @IsOptional()
  minLength: Number;

  @IsOptional()
  priceAddIfOut: Number;

  @IsOptional()
  suitableFor: string;

  @IsOptional()
  image: string;

  @IsOptional()
  status: string;
}
