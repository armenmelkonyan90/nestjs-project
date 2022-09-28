import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserLoginStrategy } from './user-login.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    PassportModule
  ],
  providers: [AuthService, UserService, UserLoginStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
