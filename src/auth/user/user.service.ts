import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';

import { IUser } from '../../database';
import { UtilService } from '../../utils';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  private readonly userRepo: UserRepository;

  @Inject(UtilService)
  private readonly utilService: UtilService;

  public async create(data: CreateUserDto) {
    await this.throwIfUserExists(data);

    // Hash password
    data.password = await this.utilService.hashPassword(data.password);

    // Todo: clean up user data
    UserService.cleanUpUserData(data);
    // Create user
    const user: IUser = await this.userRepo.create(
      _.pick(data, ['email', 'password', 'phone']),
    );

    // Delete password from the user's data graph
    delete user.password;

    // Generate JWT token
    let token;
    try {
      const tokenData = { id: user.id, email: user.email };
      token = this.utilService.generateJwtToken(tokenData);
    } catch (e) {
      // Delete user and address if token generation fails
      await this.rollbackUserAccount(user);

      // Throw error
      throw new InternalServerErrorException(
        `Error generating JWT token: ${e.message}`,
      );
    }

    return { user, auth_token: token };
  }

  public async updateUser(reqUser: IUser, updateUserDto: UpdateUserDto) {
    // Extract and add address data to the user's data graph

    UserService.cleanUpUserData(updateUserDto);
    // check if password exists
    if (updateUserDto.password) {
      // Hash password
      updateUserDto.password = await this.utilService.hashPassword(
        updateUserDto.password,
      );
    }
    // Update user
    const user: IUser = await this.userRepo.update(reqUser.id, updateUserDto);
    // Relate user to address (one-to-many)
    return { user };
  }

  public async updatePassword(
    user: IUser,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    // Hash password
    updateUserPasswordDto.password = await this.utilService.hashPassword(
      updateUserPasswordDto.password,
    );
    // Update user
    return this.userRepo.update(user.id, {
      password: updateUserPasswordDto.password,
    });
  }

  private async throwIfUserExists(data: CreateUserDto): Promise<void> {
    let existingUser;

    // check if user exists using email
    if (data.email) {
      existingUser = await this.userRepo.findOne({ email: data.email });
    }

    if (existingUser) {
      throw new ConflictException('User with the email address already exists');
    }

    if (existingUser) {
      throw new ConflictException('User with the username already exists');
    }

    // check if user exists using phone number
    if (!existingUser && data.phone) {
      existingUser = await this.userRepo.findOne({ phone: data.phone });
    }

    if (existingUser) {
      throw new ConflictException('User with the phone number already exists');
    }
  }

  private static cleanUpUserData(data: Partial<UpdateUserDto & IUser>): void {
    delete data.confirm_password;
    delete data.bvn;
    delete data.address;
    delete data.zip_code;
    delete data.city;
    delete data.state;
    delete data.country;
    delete data.is_active;
    delete data.email_verified;
    delete data.is_active;
    delete data.bvn_verified;
    delete data.deleted_at;
  }

  private async rollbackUserAccount(user: any): Promise<void> {
    await this.userRepo.delete(user.id);
  }

  public async fetchSingleUser(userId: string) {
    Logger.log('Fetching user');
    const user: IUser = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.password;
    return { user };
  }
  public async findAllUser(): Promise<any> {
    const allUsers = await this.userRepo.findAll();
    return allUsers;
  }

  public async findById(id: string): Promise<any> {
    const user = await this.userRepo.findById(id);
    return { user };
  }

  public async deleteUser(id: string): Promise<any> {
    const user = await this.userRepo.delete(id);

    return { user };
  }

  // public async updateUserAccount(payload: any): Promise<void> {}
}
