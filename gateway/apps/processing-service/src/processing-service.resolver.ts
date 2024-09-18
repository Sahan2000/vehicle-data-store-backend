import { Resolver } from '@nestjs/graphql';
import { ProcessingServiceService } from './processing-service.service';

@Resolver()
export class ProcessingServiceResolver {
  constructor(private readonly processingServiceService: ProcessingServiceService) {}
}
