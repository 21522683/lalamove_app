import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
//Alj8zjz8KqlaCoqb
// 21522448
//mongodb+srv://21522448:Alj8zjz8KqlaCoqb@lalamove.yy2l8yg.mongodb.net/?retryWrites=true&w=majority&appName=lalamove
//mongodb+srv://21522448:Alj8zjz8KqlaCoqb@lalamove.yy2l8yg.mongodb.net/
// add
bootstrap();
