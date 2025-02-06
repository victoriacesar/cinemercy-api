import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { RegisterMovieDto } from './dto/register-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateMovieDto) {
    return this.prismaService.movies.create({ data });
  }

  async findAll() {
    return this.prismaService.movies.findMany();
  }

  async findById(id: string) {
    return this.prismaService.movies.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateMovieDto) {
    return this.prismaService.movies.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prismaService.movies.delete({ where: { id } });
  }

  async registerMovieForUser(registerMovieDto: RegisterMovieDto) {
    const { userId, movieId, rating, review, watchedAt } = registerMovieDto;

    return this.prismaService.userMovies.upsert({
      where: { userId_movieId: { userId, movieId } },
      update: { watchedAt, rating, review },
      create: { userId, movieId, watchedAt, rating, review },
    });
  }
}
