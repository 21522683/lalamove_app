import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas';
import { JwtModule } from '@nestjs/jwt';
import { VehicleType, VehicleTypeSchema } from 'src/schemas/VehicleType.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "401b45ad307745673e0ddcce5476b684c10100dc7a0366898735c654e944c8630b5ebc603eb5b007c934a78c25e44c9d28beecbc6795efebe21bd37144ab98d4",
      signOptions:{expiresIn:'1d'}
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: VehicleType.name,
        schema: VehicleTypeSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
