import { IsOptional } from 'class-validator';

export class CreateOrderDTO {
  @IsOptional()
  drive: string;

  vehicleType: string;

  @IsOptional()
  shortDescription: string;

  sourceAddress: {
    addressString: string;
    fullName: string;
    phoneNumber: string;
    detail: string;
    latitude: number;
    longitude: number;
  };

  destinationAddress: {
    addressString: string;
    fullName: string;
    phoneNumber: string;
    detail: string;
    latitude: number;
    longitude: number;
  };
  @IsOptional()
  status: string;

  goodsImage: string;
  goodsType: string;

  @IsOptional()
  note: string;

  charge: number;

  @IsOptional()
  discountPrice: number;

  @IsOptional()
  date: Date;
}
