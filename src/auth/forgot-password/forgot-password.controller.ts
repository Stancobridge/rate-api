import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseService } from '../../base';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('auth/forgot-password')
@ApiTags('auth')
export class ForgotPasswordController {
  @Inject(ForgotPasswordService)
  private readonly forgotPasswordService: ForgotPasswordService;
  @Inject(BaseService)
  private readonly baseService: BaseService;

  @Post()
  async sendResetToken(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const tokenResponse =
      await this.forgotPasswordService.sendForgotPasswordToken(
        forgotPasswordDto,
      );

    // return the forgot password response
    return this.baseService.transformResponse(
      'Reset password link sent',
      tokenResponse,
      HttpStatus.OK,
    );
  }

  // Change password with token
  @Patch(':token')
  async resetPasswordWithToken(
    @Param('token') token: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const resetPassword =
      await this.forgotPasswordService.resetPasswordWithToken(
        changePasswordDto,
        token,
      );

    return this.baseService.transformResponse(
      'Password reset successful',
      resetPassword,
    );
  }
}
