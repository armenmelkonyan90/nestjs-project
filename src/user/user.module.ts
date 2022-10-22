import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/aws/s3/s3.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService, S3Service]
})
export class UserModule {}
