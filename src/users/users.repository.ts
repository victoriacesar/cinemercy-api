import { Users } from './users.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Users) {
    return this.prismaService.users.create({ data });
  }

  async findAll() {
    return this.prismaService.users.findMany();
  }

  async findOneByUsername(username: string) {
    return this.prismaService.users.findUnique({ where: { username } });
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
}
