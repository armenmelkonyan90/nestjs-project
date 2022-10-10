import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserLoginStrategy } from './user-login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CheckJwtStrategy } from './check-jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_USER_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_USER_EXPIRE_TIME },
    }),
    TypeOrmModule.forFeature([
      User
    ]),
    PassportModule
  ],
  providers: [AuthService, UserService, ConfigService, UserLoginStrategy, CheckJwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
