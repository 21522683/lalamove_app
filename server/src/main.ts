import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost) 
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
//Alj8zjz8KqlaCoqb

bootstrap();
