import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from '../dto/user.dto';

@Injectable()

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private logger: LoggerService
  ) {}

  async someDatabaseOperation() {
    const query = 'SELECT * FROM users;';
    const users = await this.userRepository.query(query);
    return users;
  }

  async create(createUserDto: RegisterDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(email: string): Promise<void> {
    await this.userRepository.delete(email);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60m' }),
    };
  }
}
