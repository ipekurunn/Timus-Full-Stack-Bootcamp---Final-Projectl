import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactoryDetail } from '../entities/factory-detail.entity';
import { CreateFactoryDetailDto, UpdateFactoryDetailDto } from '../dto/factory-detail.dto';

@Injectable()
export class FactoryDetailService {
  constructor(
    @InjectRepository(FactoryDetail)
    private readonly factoryDetailRepository: Repository<FactoryDetail>,
  ) {}

  async create(createFactoryDetailDto: CreateFactoryDetailDto): Promise<FactoryDetail> {
    const newFactoryDetail = this.factoryDetailRepository.create(createFactoryDetailDto);
    return await this.factoryDetailRepository.save(newFactoryDetail);
  }

  async findAll(): Promise<FactoryDetail[]> {
    return await this.factoryDetailRepository.find();
  }

  async findOne(id: number): Promise<FactoryDetail> {
    const factoryDetail = await this.factoryDetailRepository.findOne({ where: { id } });
    if (!factoryDetail) {
      throw new NotFoundException(`Factory detail with ID ${id} not found`);
    }
    return factoryDetail;
  }

  async update(id: number, updateFactoryDetailDto: UpdateFactoryDetailDto): Promise<FactoryDetail> {
    const factoryDetail = await this.factoryDetailRepository.findOne({ where: { id } });
    if (!factoryDetail) {
      throw new NotFoundException(`Factory detail with ID ${id} not found`);
    }

    Object.assign(factoryDetail, updateFactoryDetailDto);
    return await this.factoryDetailRepository.save(factoryDetail);
  }

  async remove(id: number): Promise<void> {
    const result = await this.factoryDetailRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Factory detail with ID ${id} not found`);
    }
  }
}
