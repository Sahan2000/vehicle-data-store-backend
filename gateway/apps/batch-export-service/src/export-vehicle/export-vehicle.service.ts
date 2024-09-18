import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Vehicle } from './entity/exprot-vehicle.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ExportVehicleService {
    constructor(private readonly dataSource: DataSource){}
    async getVehicles(num:number, argument:string): Promise<string> {
        let vehicles = [];
        if(argument === 'max'){
            const query = `SELECT * FROM vehicle WHERE TIMESTAMPDIFF(YEAR, manufactured_date, CURDATE()) > ${num}`;
            const vehiclesDatas = await this.dataSource.query(query);
            vehiclesDatas.forEach((element: Vehicle) => {
                vehicles.push(element);
            });
        }else if(argument === 'min'){
            const query = `SELECT * FROM vehicle WHERE TIMESTAMPDIFF(YEAR, manufactured_date, CURDATE()) < ${num}`;
            const vehiclesDatas = await this.dataSource.query(query);
            vehiclesDatas.forEach((data: Vehicle)=>{
                vehicles.push(data);
            });
        }
        
        // Convert vehicles to CSV format
        return this.convertToCSV(vehicles);
    }

    private convertToCSV(vehicles: Vehicle[]): string {
        const header = 'ID,First Name,Last Name,Email,Car Make,Car Model,VIN,Manufactured Date,Age of Vehicle\n';
        const rows = vehicles.map(vehicle => 
            `${vehicle.id},${vehicle.first_name},${vehicle.last_name},${vehicle.email},${vehicle.car_make},${vehicle.car_model},${vehicle.vin},${vehicle.manufactured_date},${vehicle.age_of_vehicle}`).join('\n');
        
        const csvContent = header + rows;

        // Define the file path and save the CSV
        const fileName = `vehicles-${Date.now()}.csv`;
        const filePath = path.join(__dirname, '../../static', fileName);
        
        if (!fs.existsSync(path.join(__dirname, '../../static'))) {
            fs.mkdirSync(path.join(__dirname, '../../static'));
        }
        
        fs.writeFileSync(filePath, csvContent);

        // Return the file name so the resolver can generate a download URL
        return fileName;
    }
}
