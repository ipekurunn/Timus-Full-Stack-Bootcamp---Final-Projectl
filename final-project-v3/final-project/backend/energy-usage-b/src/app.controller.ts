import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PG_CONNECTION } from './constants';
import { Pool } from 'pg';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(PG_CONNECTION) private readonly pool: Pool,
  ) {}

  @Get('users')
  async getUsers(): Promise<any> {
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows;
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({

    }),
    AuthModule,
  ],
})
export class AppModule {}
