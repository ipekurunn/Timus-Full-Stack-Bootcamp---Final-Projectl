import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
