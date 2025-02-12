import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.JWT_SECRET_REFRESH_TOKEN,
    expiresIn: process.env.JWT_REFRESH_EXPIRE_IN,
  }),
);
