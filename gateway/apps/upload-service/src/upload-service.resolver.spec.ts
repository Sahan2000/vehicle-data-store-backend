import { Test, TestingModule } from '@nestjs/testing';
import { UploadServiceResolver } from './upload-service.resolver';
import { UploadServiceService } from './upload-service.service';

describe('UploadServiceResolver', () => {
  let resolver: UploadServiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadServiceResolver, UploadServiceService],
    }).compile();

    resolver = module.get<UploadServiceResolver>(UploadServiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
