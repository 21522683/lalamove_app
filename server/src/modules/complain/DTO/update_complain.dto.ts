import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateComplainDTO {
  @IsString()
  @IsNotEmpty()
  response: string;

  @IsBoolean()
  @IsNotEmpty()
  isResponsed?: boolean;

  @IsOptional()
  responseDate?: Date;
}
