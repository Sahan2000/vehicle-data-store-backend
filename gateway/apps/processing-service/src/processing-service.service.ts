import { Inject, Injectable } from '@nestjs/common';
import { Vehicle } from './entity/processing-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProcessingServiceService {
    // inject repository
    constructor(
        @Inject('VEHICLE_REPOSITORY')
        private vehicleRepository: Repository<Vehicle>,
      ) {}
      // save vehicle
      async saveVehicle(data: any){
        const vehicle = this.createVehicle(data);
        this.vehicleRepository.save(vehicle);
    }

    // Method to calculate the age of the vehicle
    calculateVehicleAge(manufacturedDate: Date): number {
        const currentDate = new Date();
        const age = currentDate.getFullYear() - manufacturedDate.getFullYear();
        const monthDiff = currentDate.getMonth() - manufacturedDate.getMonth();

        // If the vehicle's manufactured month is later in the year, subtract one year
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < manufacturedDate.getDate())) {
            return age - 1;
        }

        return age;
    }

    // Method to create a Vehicle instance from data
    createVehicle(data: any): Vehicle {
        const vehicle = new Vehicle();
        vehicle.first_name = data.first_name;
        vehicle.last_name = data.last_name;
        vehicle.email = data.email;
        vehicle.car_make = data.car_make;
        vehicle.car_model = data.car_model || 'Unknown';
        vehicle.vin = data.vin;
        vehicle.manufactured_date = new Date(data.manufactured_date);
        vehicle.age_of_vehicle = this.calculateVehicleAge(vehicle.manufactured_date);
        return vehicle;
    }
}
