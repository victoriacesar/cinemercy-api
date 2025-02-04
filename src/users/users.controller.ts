import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Get, Put, Delete } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(username, updateUserDto);
  }

  @Delete(':username')
  async remove(@Param('username') username: string) {
    return this.usersService.removeUser(username);
  }
}
