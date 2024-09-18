import { Module } from '@nestjs/common';
import { UploadServiceResolver } from './upload-service.resolver';
import { UploadServiceService } from './upload-service.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      },
      csrfPrevention:false
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,  // Ensure both services use the same Redis host and port
      },
    }),
    BullModule.registerQueue({
      name: 'file-queue',
    })
  ],
  providers: [UploadServiceResolver, UploadServiceService],
})
export class UploadServiceModule {}
