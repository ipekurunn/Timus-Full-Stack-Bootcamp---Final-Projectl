import { User } from './entities/user.entity';

export interface RegisterResponse {
    success: boolean;
    message?: string;
    user?: User;
  }