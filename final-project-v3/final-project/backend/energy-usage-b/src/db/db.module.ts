import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { dbProvider } from './db.providers';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'somedb',
        password: 'meh',
        port: 5432,
      }),
    },
  ],
  exports: ['PG_CONNECTION'], 
})
export class DbModule {}
