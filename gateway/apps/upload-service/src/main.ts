import { NestFactory } from '@nestjs/core';
import { UploadServiceModule } from './upload-service.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(UploadServiceModule);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));
  await app.listen(3000);
}
bootstrap();
