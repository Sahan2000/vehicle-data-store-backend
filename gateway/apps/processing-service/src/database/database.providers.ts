import { DataSource } from "typeorm";
import { Vehicle } from "../entity/processing-service.entity";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
              type: 'mysql',
              host: 'localhost',
              port: 3306,
              username: 'root',
              password: '1234',
              database: 'vehicle_db',
              entities: [
                  Vehicle,
              ],
              synchronize: true,
            });
      
            return dataSource.initialize();
          },
    }
]