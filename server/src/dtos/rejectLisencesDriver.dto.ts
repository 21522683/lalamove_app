import { IsNotEmpty, IsString } from 'class-validator';

export class rejectLisencesDriverDto {
    @IsNotEmpty()
    @IsString()
    idLisences: string;

    @IsNotEmpty()
    @IsString()
    reason: string;
}
