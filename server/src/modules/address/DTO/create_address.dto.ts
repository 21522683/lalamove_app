import { IsOptional } from 'class-validator';

export class CreateAddressDTO {
  user: string;

  @IsOptional()
  province: string;

  @IsOptional()
  district: string;

  @IsOptional()
  ward: string;

  @IsOptional()
  detail: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  latitude: number;

  @IsOptional()
  longtitude: number;
}
