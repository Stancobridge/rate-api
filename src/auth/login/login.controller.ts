import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { BaseService } from '../../base';
import { IpAddress } from '../../decorators/IpAddress';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller({
  path: 'auth/login',
})
@ApiTags('auth')
export class LoginController {
  @Inject(BaseService)
  private readonly baseService: BaseService;

  constructor(private readonly loginService: LoginService) {}

  @Post('/')
  @UseGuards(AuthGuard('local'))
  async login(
    @IpAddress() ip,
    @Body() loginDto: LoginDto,
    @Request() { user, headers },
  ) {
    const loginData = await this.loginService.login(user, {
      ...headers,
      ip,
    });
    return this.baseService.transformResponse(
      'User logged in successfully',
      loginData,
      HttpStatus.OK,
    );
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
