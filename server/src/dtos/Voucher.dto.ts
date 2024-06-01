import { IsNotEmpty, IsString } from 'class-validator';

export class VoucherDto {
  @IsNotEmpty()
  @IsString()
  voucherCode: string;

  @IsNotEmpty()
  voucherPrice: Number;

  @IsNotEmpty()
  isPercent: Boolean;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  expiredDate: Date;

  @IsNotEmpty()
  minPrice: Number;

  @IsNotEmpty()
  quality: Number;

  @IsNotEmpty()
  applyFor: string;

  @IsNotEmpty()
  description: string;
}
