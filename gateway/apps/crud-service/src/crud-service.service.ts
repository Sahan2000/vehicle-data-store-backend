import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCrudServiceInput } from './dto/create-crud-service.input';
import { UpdateCrudServiceInput } from './dto/update-crud-service.input';
import { PaginatedMembers } from './dto/paginatedMembers';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Vehicle } from './entities/crud-service.entity';

@Injectable()
export class CrudServiceService {
  constructor(
    @InjectRepository(Vehicle)
    private memberRepository: Repository<Vehicle>,
  ) {}
  create(createCrudServiceInput: CreateCrudServiceInput) {
    return 'This action adds a new crudService';
  }

  // searching wild cart logic
  async findAll(page:number, pageSize: number,search: string): Promise<PaginatedMembers> {
    const skip = (page - 1) * pageSize;
    const whereCondition = search
      ? { car_model: Like(`${search}%`) } // Wildcard search for car_model
      : {}; // No search, return all
    // Get members with pagination and order by manufactured_date (ASC)
    const [members, totalCount] = await this.memberRepository.findAndCount({
      where: whereCondition,
      order: { manufactured_date: 'ASC' },
      skip: skip,
      take: pageSize,
    });

    return {
      members,
      totalCount,
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} crudService`;
  }

  // update vehicle logic
  async update(id: number, updateCrudServiceInput: UpdateCrudServiceInput): Promise<Vehicle>{
    const vehicle = await this.memberRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    Object.assign(vehicle, updateCrudServiceInput);
    return this.memberRepository.save(vehicle);
  }

  // remove vehicle logic
  async remove(id: number): Promise<boolean> {
    const vehicle = await this.memberRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    await this.memberRepository.delete(id);
    return true;
  }
}
