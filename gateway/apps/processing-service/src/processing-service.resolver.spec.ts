import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingServiceResolver } from './processing-service.resolver';
import { ProcessingServiceService } from './processing-service.service';

describe('ProcessingServiceResolver', () => {
  let resolver: ProcessingServiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingServiceResolver, ProcessingServiceService],
    }).compile();

    resolver = module.get<ProcessingServiceResolver>(ProcessingServiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
