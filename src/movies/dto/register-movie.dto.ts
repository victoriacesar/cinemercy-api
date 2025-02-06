import {
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class RegisterMovieDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  movieId: string;

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  review?: string;

  @IsOptional()
  @IsDateString()
  watchedAt?: Date;
}
