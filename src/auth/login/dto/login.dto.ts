import { IsString } from 'class-validator';

export class LoginDto {
  // User's login username
  @IsString()
  email: string;

  // User's login password
  @IsString()
  password: string;
}
