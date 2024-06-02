import { IsOptional } from 'class-validator';

export class CreateComplainDTO {
  user: string;

  order: string;

  content?: string;

  images?: string[];

  isResponsed?: boolean;

  @IsOptional()
  complainDate?: Date;
}
