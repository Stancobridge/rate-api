import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentService } from '../../configs';
import { UtilModule } from '../../utils';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  imports: [
    UtilModule,
    JwtModule.register({
      secret: EnvironmentService.getValue('JWT_SECRET'),
      signOptions: { expiresIn: '24hrs' },
    }),
  ],
  providers: [LoginService],
})
export class LoginModule {}
