import { Injectable } from '@nestjs/common';
import { CreateUserProfessionDto } from './dto/create-user-profession.dto';
import { UpdateUserProfessionDto } from './dto/update-user-profession.dto';

@Injectable()
export class UserProfessionService {
  create(createUserProfessionDto: CreateUserProfessionDto) {
    return 'This action adds a new userProfession';
  }

  findAll() {
    return `This action returns all userProfession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProfession`;
  }

  update(id: number, updateUserProfessionDto: UpdateUserProfessionDto) {
    return `This action updates a #${id} userProfession`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProfession`;
  }
}
