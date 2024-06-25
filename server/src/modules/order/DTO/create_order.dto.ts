import { IsOptional } from 'class-validator';

export class CreateOrderDTO {
  @IsOptional()
  drive: string;

  vehicleType: string;

  @IsOptional()
  shortDescription: string;

  sourceAddress: {
    address: string;
    latitude: number;
    longitude: number;
  };

  destinationAddress: {
    address: string;
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
