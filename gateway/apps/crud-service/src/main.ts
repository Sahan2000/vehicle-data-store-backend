import { NestFactory } from '@nestjs/core';
import { CrudServiceModule } from './crud-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CrudServiceModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Adjust as needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(3003);
}
bootstrap();
