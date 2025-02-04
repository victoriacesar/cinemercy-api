import { Users } from './users.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Users) {
    return this.prismaService.users.create({ data });
  }
}
