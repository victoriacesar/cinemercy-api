import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsInt()
  releaseYear?: number;

  @IsNotEmpty()
  @IsDateString()
  groupDayWatch: Date;

  @IsOptional()
  @IsBoolean()
  isMovieActive?: boolean;
}
