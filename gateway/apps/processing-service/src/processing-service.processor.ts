import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';
import * as csv from 'csv-parser';  // For CSV parsing
import * as xlsx from 'xlsx';  // For Excel parsing
import * as path from 'path';
import { ProcessingServiceService } from './processing-service.service';
import { VehicleDTO } from './dto/dto';

@Processor('file-queue')
export class JobProcessor{
    constructor(private readonly fileProcessService: ProcessingServiceService){}
    @Process('read-file')
    async handleFileProcessing(job: Job<any>) {
        const { filePath } = job.data;
        console.log('Processing file:', filePath);
    
        //Determine file extension
        const fileExtension = path.extname(filePath).toLowerCase();
        try {
          let results: string | any[];
          if (fileExtension === '.csv') {
            // Process CSV file
            console.log('hi');
            results = await this.processCsvFile(filePath);
          } else if (fileExtension === '.xlsx' || fileExtension === '.xls') {
            // Process Excel file
            console.log('hi');
            results = await this.processExcelFile(filePath);
          } else {
            throw new Error('Unsupported file format');
          }
    
          console.log(`Processed ${results.length} rows.`);
        } catch (err) {
          console.error('Error processing file:', err);
        }
    }
    // Method to process CSV file
    async processCsvFile(filePath: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
          const results = [];
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (data) => {
              try {
                // Save each vehicle data
                const vehicleDTO = new VehicleDTO();
                vehicleDTO.first_name = data.first_name;
                vehicleDTO.last_name = data.last_name;
                vehicleDTO.email = data.email;
                vehicleDTO.car_make = data.car_make;
                vehicleDTO.car_model = data.car_model;
                vehicleDTO.vin = data.vin;
                vehicleDTO.manufactured_date = data.manufactured_date;
                await this.fileProcessService.saveVehicle(vehicleDTO);
                results.push(data);
              } catch (error) {
                console.error('Error saving vehicle:', error);
              }
            })
            .on('end', () => {
              resolve(results);
            })
            .on('error', (err) => {
              console.error('Error processing CSV file:', err);
              reject(err);
            });
        });
    }
    
    // Method to process Excel file
    async processExcelFile(filePath: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            try {
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0]; // Assuming you process the first sheet
                const sheet = workbook.Sheets[sheetName];
    
                // Convert the sheet to JSON
                const data = xlsx.utils.sheet_to_json(sheet);
    
                // Process each row and save it to the database
                data.forEach((row) => {
                    this.fileProcessService.saveVehicle(row);
                    console.log(row);
                    console.log();
                });
    
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}