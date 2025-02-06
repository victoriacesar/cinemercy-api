import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { RegisterMovieDto } from './dto/register-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @Roles(Role.ADMIN)
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  async getMovies() {
    return this.moviesService.getMovies();
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.moviesService.getMovieById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async removeMovie(@Param('id') id: string) {
    return this.moviesService.removeMovie(id);
  }

  @Post('register/user')
  async registerMovie(@Body() registerMovieDto: RegisterMovieDto) {
    return this.moviesService.registerMovieForUser(registerMovieDto);
  }
}
