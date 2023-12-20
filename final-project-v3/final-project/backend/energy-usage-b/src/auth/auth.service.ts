import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RegisterDto, LoginDto } from '../dto/user.dto';
import { RegisterResponse } from 'src/user.interface';
import { MailerService } from '../services/mailer.service';
import { UserService } from '../services/user.service';


@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService, // UserService'ı burada enjekte edin

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = new User();
      user.email = registerDto.email;
      user.password = hashedPassword;
      
      await this.userRepository.save(user);
      
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: 'Kullanıcı oluşturulamadı' };
      }
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
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
      access_token: this.jwtService.sign(payload),
    };
  }

  private async logLoginAttempt(username: string, isSuccess: boolean): Promise<void> {
    await this.elasticsearchService.index({
      index: 'user-login-attempts',
      body: {
        username,
        timestamp: new Date(),
        isSuccess
      },
    });
  }

  async sendResetPasswordEmail(userEmail: string, token: string) {
    const mailOptions = {
      from: '"Your App Name" <your@email.com>',
      to: userEmail,
      subject: 'Password Reset',
      text: `Your password reset token is: ${token}`,
    };
  
    await this.mailerService.send(mailOptions);
  }

}


