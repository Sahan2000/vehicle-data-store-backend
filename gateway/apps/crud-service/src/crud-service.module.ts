import { Module } from '@nestjs/common';
import { CrudServiceService } from './crud-service.service';
import { CrudServiceResolver } from './crud-service.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/crud-service.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Your database host
      port: 3306, // Your database port (default: 3306)
      username: 'root', // Your database username
      password: '1234', // Your database password
      database: 'vehicle_db', // Your database name
      entities: [Vehicle], // Array of your entities
      synchronize: true, // Set to true for development (auto-sync DB schema). Use false for production.
    }),
    TypeOrmModule.forFeature([Vehicle]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      },
      csrfPrevention:false
    }),
  ],
  providers: [CrudServiceResolver, CrudServiceService],
})
export class CrudServiceModule {}
