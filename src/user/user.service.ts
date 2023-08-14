import { CreateUserDto } from './dto/createUser.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    return null;
  }
}
