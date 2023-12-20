import { IsString, MinLength, MaxLength, Matches, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string; 

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak.',
  })
  password: string;
}

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password?: string;
}

export class RequestResetDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string; // Şifre sıfırlama için kullanılan token

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  newPassword: string; // Yeni şifre
}