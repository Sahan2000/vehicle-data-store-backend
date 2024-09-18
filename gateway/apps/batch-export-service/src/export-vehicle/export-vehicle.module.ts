import { Module } from '@nestjs/common';
import { ExportVehicleResolver } from './export-vehicle.resolver';
import { ExportVehicleService } from './export-vehicle.service';
import { Vehicle } from './entity/exprot-vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver, // Use Apollo as the GraphQL driver
            autoSchemaFile: true, // Automatically generate schema
            playground: true, // Enable GraphQL Playground for testing
          }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1234',
            database: 'vehicle_db',
            entities: [Vehicle], // Add your entity here
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Vehicle]),
    ],
    providers: [ExportVehicleResolver,ExportVehicleService],
})
export class ExportVehicleModule {}
