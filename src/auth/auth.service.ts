import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Users> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(user: Users) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterRequestDto) {
    const existingUser = await this.usersService.findOneByUsername(
      user.username,
    );

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(user.password, 10);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const newUser = { ...user, password: hashedPassword };
    const userCreated = await this.usersService.createUser(newUser);

    return this.login(userCreated);
  }
}
