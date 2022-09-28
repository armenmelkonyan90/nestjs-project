import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusList } from './status.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create({ username, first_name, last_name, email, phone, password }: CreateUserDto) {
    const saltOrRounds = 5;

    let insertData = {
      status: StatusList.PENDING,
      username,
      first_name,
      last_name,
      email,
      phone,
      token: (Math.random() + 1).toString(36),
      password: await bcrypt.hash(password, saltOrRounds)
    }

    try {
      this.usersRepository.insert(insertData)
    } catch (error) {

    }


    return [];
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsernameAndEmail(username: string): Promise<User> {
    return this.usersRepository.findOne(
      {
        where: [
          {username},
          {email: username}
        ]
      });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
