import { Users as UsersModel } from './users.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '@prisma/client';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: UsersModel): Promise<Partial<Users>> {
    return this.usersRepository.create(data);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll();
  }

  async findOneByUsername(username: string): Promise<Users | null> {
    const user = await this.usersRepository.findOneByUsername(username);

    return user;
  }

  async findOneById(id: number): Promise<Users | null> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(
    username: string,
    updateUserDto: Partial<Users>,
  ): Promise<Users> {
    const user = await this.findOneByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.update(username, updateUserDto);
  }

  async removeUser(username: string): Promise<Users> {
    return this.usersRepository.remove(username);
  }

  async updateUserRole(updateRoleDto: UpdateRoleDto): Promise<Users> {
    return this.usersRepository.updateRole(updateRoleDto);
  }
}
