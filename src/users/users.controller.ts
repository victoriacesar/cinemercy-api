import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Get, Put, Delete } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Delete(':username')
  async remove(@Param('username') username: string) {
    return this.usersService.removeUser(username);
  }

  @Put('role')
  @Roles(Role.ADMIN)
  async changeUserRole(@Body() updateRoleDto: UpdateRoleDto) {
    return this.usersService.updateUserRole(updateRoleDto);
  }

  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(username, updateUserDto);
  }
}
