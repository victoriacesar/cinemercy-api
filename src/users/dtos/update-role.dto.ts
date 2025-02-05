import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly username?: string;

  @IsNotEmpty()
  @IsEnum(Role)
  readonly role?: Role;
}
