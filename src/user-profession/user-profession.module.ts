import { Module } from '@nestjs/common';
import { UserProfessionService } from './user-profession.service';
import { UserProfessionController } from './user-profession.controller';

@Module({
  controllers: [UserProfessionController],
  providers: [UserProfessionService]
})
export class UserProfessionModule {}
