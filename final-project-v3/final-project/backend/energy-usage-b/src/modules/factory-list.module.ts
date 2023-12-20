import { Module } from '@nestjs/common';
import { FactoryListController } from '../controllers/factory-list.controller';
import { FactoryListService } from '../services/factory-list.service';
import { FactoryDetailService } from '../services/factory-detail.service';

@Module({
  controllers: [FactoryListController],
  providers: [FactoryListService, FactoryDetailService],
  exports: [FactoryListService, FactoryDetailService],
})
export class FactoriesModule {}
