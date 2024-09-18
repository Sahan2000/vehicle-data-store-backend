import { Test, TestingModule } from '@nestjs/testing';
import { CrudServiceResolver } from './crud-service.resolver';
import { CrudServiceService } from './crud-service.service';

describe('CrudServiceResolver', () => {
  let resolver: CrudServiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudServiceResolver, CrudServiceService],
    }).compile();

    resolver = module.get<CrudServiceResolver>(CrudServiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
