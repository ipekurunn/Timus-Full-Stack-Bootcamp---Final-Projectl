import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ExampleController } from './controllers/example.controller';
import { User } from './entities/user.entity';
import { Factory } from './entities/factory-list.entity';
import { FactoryDetail } from './entities/factory-detail.entity';
import { UserRepository } from './user.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),

    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'g8T1@htsa',
      database: 'testdb',
      entities: [User, Factory, FactoryDetail],
      synchronize: true,
      logging: ["query", "error", "schema"],
    }),
  ],
  providers: [JwtStrategy],
  controllers: [ExampleController],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); 
  }
}
