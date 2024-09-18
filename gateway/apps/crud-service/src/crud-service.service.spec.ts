import { Test, TestingModule } from '@nestjs/testing';
import { CrudServiceService } from './crud-service.service';

describe('CrudServiceService', () => {
  let service: CrudServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudServiceService],
    }).compile();

    service = module.get<CrudServiceService>(CrudServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
