import { IsOptional } from 'class-validator';

export class CreateOrderDTO {
  @IsOptional()
  drive: string;

  customer: string;

  vehicleType: string;

  @IsOptional()
  shortDescription: string;

  sourceAddress: string;

  destinationAddress: string;

  @IsOptional()
  status: string;

  charge: number;

  discountPrice?: number;

  @IsOptional()
  date: Date;
}
