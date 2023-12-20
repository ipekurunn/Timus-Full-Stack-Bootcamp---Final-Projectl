import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { FactoryDetailService } from '../services/factory-detail.service';
import { CreateFactoryDetailDto, UpdateFactoryDetailDto } from '../dto/factory-detail.dto';

@Controller('factory-details')
export class FactoryDetailsController {
  constructor(private readonly factoryDetailsService: FactoryDetailService) {}

  @Post()
  async createFactoryDetail(@Body() createFactoryDetailDto: CreateFactoryDetailDto, @Res() res: Response) {
    try {
      const newFactoryDetail = await this.factoryDetailsService.create(createFactoryDetailDto);
      res.status(HttpStatus.CREATED).json(newFactoryDetail);
    } catch (error) {
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(HttpStatus.BAD_REQUEST).send('An unexpected error occurred');
      }
    }
  }

  @Get(':id')
  async getFactoryDetail(@Param('id') id: number, @Res() res: Response) {
    try {
      const factoryDetail = await this.factoryDetailsService.findOne(id);
      if (!factoryDetail) {
        return res.status(HttpStatus.NOT_FOUND).send('Factory detail not found');
      }
      res.json(factoryDetail);
    } catch (error) {
      if (error instanceof Error) {
        // Burada error nesnesi Error tipinde olduğu için message özelliğine erişebilirsiniz
        res.status(HttpStatus.BAD_REQUEST).send(error.message);
      } else {
        // Genel bir hata mesajı gönderin
        res.status(HttpStatus.BAD_REQUEST).send('An unexpected error occurred');
      }
    }
  }

  @Get()
  async getAllFactoryDetails(@Res() res: Response) {
    try {
      const factoryDetails = await this.factoryDetailsService.findAll();
      res.json(factoryDetails);
    } catch (error) {
      if (error instanceof Error) {
        // Burada error nesnesi Error tipinde olduğu için message özelliğine erişebilirsiniz
        res.status(HttpStatus.BAD_REQUEST).send(error.message);
      } else {
        // Genel bir hata mesajı gönderin
        res.status(HttpStatus.BAD_REQUEST).send('An unexpected error occurred');
      }
    }
  }

  @Put(':id')
  async updateFactoryDetail(@Param('id') id: number, @Body() updateFactoryDetailDto: UpdateFactoryDetailDto, @Res() res: Response) {
    try {
      const updatedFactoryDetail = await this.factoryDetailsService.update(id, updateFactoryDetailDto);
      res.json(updatedFactoryDetail);
    } catch (error) {
      if (error instanceof Error) {
        // Burada error nesnesi Error tipinde olduğu için message özelliğine erişebilirsiniz
        res.status(HttpStatus.BAD_REQUEST).send(error.message);
      } else {
        // Genel bir hata mesajı gönderin
        res.status(HttpStatus.BAD_REQUEST).send('An unexpected error occurred');
      }
    }
  }

  @Delete(':id')
  async deleteFactoryDetail(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.factoryDetailsService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof Error) {
        // Burada error nesnesi Error tipinde olduğu için message özelliğine erişebilirsiniz
        res.status(HttpStatus.BAD_REQUEST).send(error.message);
      } else {
        // Genel bir hata mesajı gönderin
        res.status(HttpStatus.BAD_REQUEST).send('An unexpected error occurred');
      }
    }
  }
}

