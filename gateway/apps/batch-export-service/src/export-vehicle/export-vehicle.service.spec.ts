import { Test, TestingModule } from '@nestjs/testing';
import { ExportVehicleService } from './export-vehicle.service';

describe('ExportVehicleService', () => {
  let service: ExportVehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportVehicleService],
    }).compile();

    service = module.get<ExportVehicleService>(ExportVehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
