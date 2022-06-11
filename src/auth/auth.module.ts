import { Module } from '@nestjs/common';
import { UtilModule } from '../utils';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { LoginModule } from './login/login.module';
import { JwtStrategy, LocalStrategy } from './strategies';

import { UserModule } from './user';

@Module({
  controllers: [],
  providers: [JwtStrategy, LocalStrategy],
  imports: [UserModule, LoginModule, ForgotPasswordModule, UtilModule],
})
export class AuthModule {}
