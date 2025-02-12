import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Users } from '@prisma/client';
import { ConfigType } from '@nestjs/config';
import refreshJwtConfig from './config/refresh-jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(username: string, password: string): Promise<Users> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: Partial<Users>) {
    const payload = { username: user.username, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);

    return {
      id: user.id,
      token,
      refreshToken,
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

  async refreshToken(user: Partial<Users>) {
    const payload = { username: user.username, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      ...payload,
      token,
    };
  }
}
