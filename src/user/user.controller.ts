import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { ReturnUserDto } from './dto/returnUser.dto';
import { UpdatePassword } from './dto/updateUser.dto';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from './enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin)
  @Get('/all')
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      userEntity => new ReturnUserDto(userEntity),
    );
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }

  @Roles(UserType.Admin, UserType.User)
  @Patch('/:userId')
  async updatePasswordUser(
    @Body() updatePassword: UpdatePassword,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePassword, userId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async getInfoUser(@UserId() userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingRelations(userId),
    );
  }
}
