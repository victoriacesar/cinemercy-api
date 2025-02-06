import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './movies.repository';
import { UsersService } from 'src/users/users.service';
import { RegisterMovieDto } from './dto/register-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly usersService: UsersService,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    return this.moviesRepository.create(createMovieDto);
  }

  async getMovies() {
    return this.moviesRepository.findAll();
  }

  async getMovieById(id: string) {
    const movie = await this.moviesRepository.findById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async updateMovie(id: string, updateMovieDto: UpdateMovieDto) {
    await this.getMovieById(id);
    return this.moviesRepository.update(id, updateMovieDto);
  }

  async removeMovie(id: string) {
    await this.getMovieById(id);
    return this.moviesRepository.delete(id);
  }

  async registerMovieForUser(registerMovieDto: RegisterMovieDto) {
    await this.usersService.findOneById(registerMovieDto.userId);
    await this.getMovieById(registerMovieDto.movieId);

    return this.moviesRepository.registerMovieForUser(registerMovieDto);
  }
}
