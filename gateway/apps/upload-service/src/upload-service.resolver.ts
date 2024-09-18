import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UploadServiceService } from './upload-service.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver()
export class UploadServiceResolver {
  constructor(private readonly uploadServiceService: UploadServiceService) {}

  @Query(()=> String)
  async sayHello(): Promise<string>{
    return 'Hello !';
  }

  // file upload logic
  @Mutation(()=>String)
  async uploadFile(@Args({name: 'file', type:()=> GraphQLUpload}) file: FileUpload): Promise<boolean>{
    console.log('file:', file);
    return this.uploadServiceService.savetoLocalDirectory(file);
  }

}
