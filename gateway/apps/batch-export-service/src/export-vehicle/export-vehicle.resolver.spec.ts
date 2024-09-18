import { Test, TestingModule } from '@nestjs/testing';
import { ExportVehicleResolver } from './export-vehicle.resolver';

describe('ExportVehicleResolver', () => {
  let resolver: ExportVehicleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportVehicleResolver],
    }).compile();

    resolver = module.get<ExportVehicleResolver>(ExportVehicleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
