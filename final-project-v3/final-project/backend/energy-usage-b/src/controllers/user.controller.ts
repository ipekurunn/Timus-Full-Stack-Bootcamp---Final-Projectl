// src/controllers/user.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterDto, UpdateUserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.userService.create(registerDto);
      return user;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserById(@Param('email') email: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllUsers() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(email, updateUserDto);
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException('An unexpected error occured', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('email') email: string) {
    try {
      await this.userService.remove(email);
      return { message: 'User successfully deleted' };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
