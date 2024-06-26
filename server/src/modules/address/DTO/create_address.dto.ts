import { IsOptional } from 'class-validator';

export class CreateAddressDTO {
  user: string;

  @IsOptional()
  addressString: string;

  @IsOptional()
  detail: string;

  @IsOptional()
  isDefault: boolean;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  fullName: string;

  @IsOptional()
  latitude: number;

  @IsOptional()
  longtitude: number;
}
