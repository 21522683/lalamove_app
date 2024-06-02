import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleType } from './Schema/vehicle-type.schema';
import { User, UserSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VehicleType.name,
        schema: VehicleType,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [VehicleTypeService],
  controllers: [VehicleTypeController],
})
export class VehicleTypeModule {}
