import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { PORT } from './shared/constanst';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
