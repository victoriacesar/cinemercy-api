import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { PrismaService } from 'src/database/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MoviesController],
  providers: [PrismaService, MoviesService, MoviesRepository],
})
export class MoviesModule {}
