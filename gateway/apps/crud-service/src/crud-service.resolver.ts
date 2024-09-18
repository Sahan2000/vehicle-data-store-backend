import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CrudServiceService } from './crud-service.service';
import { Vehicle } from './entities/crud-service.entity';
import { CreateCrudServiceInput } from './dto/create-crud-service.input';
import { UpdateCrudServiceInput } from './dto/update-crud-service.input';
import { PaginatedMembers } from './dto/paginatedMembers';

@Resolver(() => Vehicle)
export class CrudServiceResolver {
  constructor(private readonly crudServiceService: CrudServiceService) {}

  @Mutation(() => Vehicle)
  createCrudService(@Args('createCrudServiceInput') createCrudServiceInput: CreateCrudServiceInput) {
    return this.crudServiceService.create(createCrudServiceInput);
  }

  // get all vehicles and wild cart searching
  @Query(() => PaginatedMembers)
  async listMembers(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
    @Args('search', { type: () => String, nullable: true }) search: string
  ): Promise<PaginatedMembers> {
    return await this.crudServiceService.findAll(page,pageSize,search);
  }

  @Query(() => [Vehicle], { name: 'crudService' })
  findAll() {
    // return this.crudServiceService.findAll();
  }

  @Query(() => Vehicle, { name: 'crudService' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.crudServiceService.findOne(id);
  }

  // update the vehicle 
  @Mutation(() => Vehicle)
  updateCrudService(@Args('updateCrudServiceInput') updateCrudServiceInput: UpdateCrudServiceInput): Promise<Vehicle> {
    return this.crudServiceService.update(updateCrudServiceInput.id, updateCrudServiceInput);
  }

  // delete vehicle
  @Mutation(() => Vehicle)
  removeCrudService(@Args('id', { type: () => Int }) id: number): Promise<boolean>  {
    return this.crudServiceService.remove(id);
  }
}
