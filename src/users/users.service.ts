import { Users } from './users.model';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: Users) {
    return this.usersRepository.create(data);
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOneByUsername(username);
  }

  async updateUser(username: string, updateUserDto: Partial<Users>) {
    return this.usersRepository.update(username, updateUserDto);
  }

  async removeUser(username: string) {
    return this.usersRepository.remove(username);
  }
}
