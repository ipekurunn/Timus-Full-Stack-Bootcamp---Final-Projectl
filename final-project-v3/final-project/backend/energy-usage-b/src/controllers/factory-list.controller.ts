// src/factories/factories.controller.ts
import { Controller, Get, Post, Put, Delete,Body, HttpException, HttpStatus, Param, NotFoundException } from '@nestjs/common';
import { FactoryListService } from '../services/factory-list.service';
import { FactoryDetailService } from '../services/factory-detail.service';
import { CreateFactoryDto, UpdateFactoryDto } from '../dto/factory-list.dto'; // DTO'yu burada import edin

@Controller('factories')
export class FactoryListController {
  constructor(
    private readonly factoryListService: FactoryListService,
    private readonly factoryDetailService: FactoryDetailService,
  ) {}

  @Post()
  async createFactory(@Body() createFactoryDto: CreateFactoryDto) {
    try {
      const newFactory = await this.factoryListService.create(createFactoryDto);
      return newFactory;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllFactories() {
    try {
      const factories = await this.factoryListService.findAll();
      return factories;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getFactoryById(@Param('id') id: number) {
    try {
      const factory = await this.factoryListService.findOne(id);
      if (!factory) {
        throw new HttpException('Factory not found', HttpStatus.NOT_FOUND);
      }
      return factory;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateFactory(@Param('id') id: number, @Body() updateFactoryDto: UpdateFactoryDto) {
    try {
      const updatedFactory = await this.factoryListService.update(id, updateFactoryDto);
      if (!updatedFactory) {
        throw new HttpException('Factory not found', HttpStatus.NOT_FOUND);
      }
      return updatedFactory;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteFactory(@Param('id') id: number) {
    try {
      const deleteResult = await this.factoryListService.remove(id);
      if (deleteResult.affected === 0) {
        throw new HttpException('Factory not found', HttpStatus.NOT_FOUND);
      }
      return {message: 'Factory deleted successfully'};
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
