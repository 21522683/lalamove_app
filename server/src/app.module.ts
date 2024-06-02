import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { AddressModule } from './modules/address/address.module';
import { ComplainModule } from './modules/complain/complain.module';
import { OrderModule } from './modules/order/order.module';
import { VehicleTypeModule } from './modules/vehicle-type/vehicle-type.module';
import { VoucherModule } from './modules/voucher/voucher.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 100,
        limit: 5,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MyLoggerModule,
    AuthModule,
    AddressModule,
    ComplainModule,
    OrderModule,
    VehicleTypeModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
