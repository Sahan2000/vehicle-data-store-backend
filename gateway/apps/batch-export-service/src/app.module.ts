import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExportVehicleService } from './export-vehicle/export-vehicle.service';
import { ExportVehicleResolver } from './export-vehicle/export-vehicle.resolver';
import { ExportVehicleModule } from './export-vehicle/export-vehicle.module';
 

@Module({
  imports: [ExportVehicleModule],
  controllers: [AppController],
  providers: [AppService, ExportVehicleService, ExportVehicleResolver],
})
export class AppModule {}
