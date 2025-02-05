import { Users as UsersModel } from './users.model';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: UsersModel): Promise<Users> {
    return this.usersRepository.create(data);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll();
  }

  async findOneByUsername(username: string): Promise<Users | null> {
    return this.usersRepository.findOneByUsername(username);
  }

  async updateUser(
    username: string,
    updateUserDto: Partial<Users>,
  ): Promise<Users> {
    return this.usersRepository.update(username, updateUserDto);
  }

  async removeUser(username: string): Promise<Users> {
    return this.usersRepository.remove(username);
  }
}
