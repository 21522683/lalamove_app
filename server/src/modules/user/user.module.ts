import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { VehicleType, VehicleTypeSchema } from 'src/schemas';
import { Review, ReviewSchema } from '../order/Schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: VehicleType.name,
        schema: VehicleTypeSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
