import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusList } from './status.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) { }

  async create({ username, first_name, last_name, email, phone, password }: CreateUserDto) {
    const saltOrRounds = 5;
    const token = uuid();

    // let insertData = {
    //   status: StatusList.PENDING,
    //   username,
    //   first_name,
    //   last_name,
    //   email,
    //   phone,
    //   token,
    //   password: await bcrypt.hash(password, saltOrRounds)
    // }

    let user = new User();

    user.status = StatusList.PENDING;
    user.username = username;
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.phone = phone;
    user.token = token;
    user.password = await bcrypt.hash(password, saltOrRounds);

    const runner = this.dataSource.createQueryRunner();
    await runner.startTransaction();
    let isSuccess = false;

    try {
      let link = `${this.configService.get('API_URL')}/user/verify?token=${token}`

      // await this.usersRepository.insert(insertData)

      await runner.manager.save(user);

      await this.mailerService
        .sendMail({
          to: email,
          // from: 'Maid Mapper <nikarzin90@gmail.com>',
          subject: 'Email Verification',
          template: 'registration',
          context: {
            // Data to be sent to template engine.
            fullName: `${first_name} ${last_name}`,
            link,
          },
        })
        .then(async () => {
          console.log("Email successfully sent")
          await runner.commitTransaction();
          isSuccess = true;
        })
        .catch(async (e) => {
          console.log("Email not sent", e)
          await runner.rollbackTransaction();
        });

      return isSuccess;
    } catch (error) {
      console.log(error);
      await runner.rollbackTransaction();
    }

    return isSuccess;
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
          { username },
          { email: username }
        ]
      });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async updateAvatar(id: number, avatar_name: string): Promise<void> {
    await this.usersRepository.update(id, { avatar: avatar_name });
    return;
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
