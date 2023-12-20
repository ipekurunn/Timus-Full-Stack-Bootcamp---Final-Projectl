import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

@Injectable()
export class DbService {
  constructor() {}

  getPool(): Pool {
    return new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'somedb',
      password: 'meh',
      port: 5432,
    });
  }
}