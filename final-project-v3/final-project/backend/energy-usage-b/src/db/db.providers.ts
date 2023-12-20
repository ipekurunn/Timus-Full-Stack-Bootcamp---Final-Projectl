import { Provider } from '@nestjs/common';
import { DbService } from './db.service';
import { PG_CONNECTION } from '../constants';

export const dbProvider: Provider = {
  provide: PG_CONNECTION,
  useFactory: (dbService: DbService) => dbService.getPool(),
  inject: [DbService],
};
