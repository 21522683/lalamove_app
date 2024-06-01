import { Module } from '@nestjs/common';
import { ComplainService } from './complain.service';
import { ComplainController } from './complain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Complain, Complainchema } from './Schema/complain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Complain.name,
        schema: Complainchema,
      },
    ]),
  ],
  providers: [ComplainService],
  controllers: [ComplainController],
})
export class ComplainModule {}
