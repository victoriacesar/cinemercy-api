import { Users } from './users.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Users) {
    return this.prismaService.users.create({
      data,
      omit: {
        password: true,
      },
    });
  }

  async findAll() {
    return this.prismaService.users.findMany();
  }

  async findOneByUsername(username: string) {
    return this.prismaService.users.findUnique({
      where: { username },
    });
  }

  async findOneById(id: number) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }

  async update(username: string, updateUserDto: Partial<Users>) {
    return this.prismaService.users.update({
      where: { username },
      data: {
        username: updateUserDto?.username,
        name: updateUserDto?.name,
      },
    });
  }

  async remove(username: string) {
    return this.prismaService.users.delete({ where: { username } });
  }

  async updateRole(updateRoleDto: UpdateRoleDto) {
    return this.prismaService.users.update({
      where: { username: updateRoleDto.username },
      data: { role: updateRoleDto.role },
    });
  }
}
