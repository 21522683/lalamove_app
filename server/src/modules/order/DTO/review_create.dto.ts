import { IsOptional } from 'class-validator';

export class CreateReivewDTO {
    @IsOptional()
    order: string;
    
    @IsOptional()
    content: string;

    @IsOptional()
    star: string;

    @IsOptional()
    drive: string;
}
