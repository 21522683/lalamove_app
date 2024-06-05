import { IsNotEmpty, IsString } from 'class-validator';

export class rejectVehiclesDriverDto {
    @IsNotEmpty()
    @IsString()
    idVehicles: string;

    @IsNotEmpty()
    @IsString()
    reason: string;
}
