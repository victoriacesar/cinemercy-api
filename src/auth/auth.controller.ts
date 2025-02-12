import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseDTO } from './dto/login-response.dto';
import { Users } from '@prisma/client';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDTO } from './dto/register-response.dto';
import { Public } from './decorator/public.decorator';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request()
    req: {
      user: Users;
    },
  ): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return this.authService.register(registerBody);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
