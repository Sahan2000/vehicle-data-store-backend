import { Module } from '@nestjs/common';
import { ProcessingServiceResolver } from './processing-service.resolver';
import { ProcessingServiceService } from './processing-service.service';
import { JobProcessor } from './processing-service.processor';
import { vehicleProviders } from './processing-service.providers';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entity/processing-service.entity';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [DatabaseModule,
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
  providers: [ProcessingServiceResolver, ProcessingServiceService, ...vehicleProviders,JobProcessor],
})
export class ProcessingServiceModule {}
