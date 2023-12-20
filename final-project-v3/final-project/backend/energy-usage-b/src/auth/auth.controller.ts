import { BadRequestException, Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ResetPasswordDto } from '../dto/user.dto';
import { UserRepository } from '../user.repository';
import { MailerService } from '../services/mailer.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailerService: MailerService,
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,

    ) {}

  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    const result = await this.authService.register(RegisterDto);
    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('request-password-reset')
  async sendResetPasswordToken(@Body('email') email: string): Promise<void> {
    const userName = await this.userRepository.findOneByEmail(email);
    if (!userName) {
      throw new BadRequestException('Kullanıcı bulunamadı.');
    }
  
    const token = this.generateResetToken();
    userName.resetToken = token;
    await this.userRepository.save(userName);
  
    await this.mailerService.send({
      to: email,
      subject: 'Şifre Sıfırlama İsteği',
      text: `Şifrenizi sıfırlamak için bu token'ı kullanın: ${token}`,
    });
  }
  

  private generateResetToken(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto;
  
    // Directly pass the criteria object
    const user = await this.userRepository.findOneBy({
      resetToken: token
    });
  
    if (!user) {
      throw new BadRequestException('Geçersiz veya süresi dolmuş token.');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    
    await this.userRepository.save(user);
  }
}
