import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseService } from '../../base';
import { IUser } from '../../database';
import { JwtAuthGuard } from '../login';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

@Controller('auth/users')
@ApiTags('auth')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(BaseService)
  private readonly baseService: BaseService;

  @Post('/')
  public async create(@Body() data: CreateUserDto) {
    const newUser = await this.userService.create(data);

    return this.baseService.transformResponse(
      'User created successfully',
      newUser,
      HttpStatus.CREATED,
    );
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public async getAllUsers() {
    const allUsers = await this.userService.findAllUser();
    return this.baseService.transformResponse(
      'All users fetched successfully',
      allUsers,
      HttpStatus.OK,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  public async updateUserAccount(
    @Req() { user }: { user: IUser },
    @Body() body: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(user, body);
    return this.baseService.transformResponse(
      'User profile updated',
      updatedUser,
      HttpStatus.OK,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public async updateUserPassword(
    @Req() { user }: { user: IUser },
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const updatedUser = await this.userService.updatePassword(
      user,
      updateUserPasswordDto,
    );
    return this.baseService.transformResponse(
      'User password updated',
      updatedUser,
      HttpStatus.OK,
    );
  }

  @Delete('/:id')
  public async deleteUserAccount(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    return this.baseService.transformResponse(
      'user deleted',
      deletedUser,
      HttpStatus.OK,
    );
  }
}
