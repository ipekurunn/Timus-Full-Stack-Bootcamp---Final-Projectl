import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Factory } from '../entities/factory-list.entity'; 
import { CreateFactoryDto, UpdateFactoryDto } from '../dto/factory-list.dto'; 

@Injectable()
export class FactoryListService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

  async create(createFactoryDto: CreateFactoryDto): Promise<Factory> {
    const newFactory = this.factoryRepository.create(createFactoryDto);
    return this.factoryRepository.save(newFactory);
  }

  async findAll(): Promise<Factory[]> {
    return this.factoryRepository.find();
  }

  async findOne(id: number): Promise<Factory | undefined> {
    return this.factoryRepository.findOneBy({id});
  }

  async update(id: number, updateFactoryDto: UpdateFactoryDto): Promise<Factory> {
    const factory = await this.findOne(id);
    if (!factory) {
      throw new Error('Factory not found');
    }
    Object.assign(factory, updateFactoryDto);
    return this.factoryRepository.save(factory);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.factoryRepository.delete(id);
  }
}
