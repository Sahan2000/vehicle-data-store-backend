import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingServiceService } from './processing-service.service';

describe('ProcessingServiceService', () => {
  let service: ProcessingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingServiceService],
    }).compile();

    service = module.get<ProcessingServiceService>(ProcessingServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
