import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentService } from '../../configs';

import { UtilModule } from '../../utils';
import { UserModule } from '../user';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordRepository } from './forgot-password.repository';
import { ForgotPasswordService } from './forgot-password.service';

@Module({
  providers: [ForgotPasswordService, ForgotPasswordRepository],
  controllers: [ForgotPasswordController],
  imports: [
    JwtModule.register({
      secret: EnvironmentService.getValue('JWT_SECRET'),
      signOptions: { expiresIn: '7h' },
    }),
    UserModule,
    UtilModule,
  ],
})
export class ForgotPasswordModule {}
