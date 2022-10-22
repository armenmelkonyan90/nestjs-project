import { Controller, UseInterceptors, InternalServerErrorException, ParseFilePipeBuilder, UploadedFile, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from './user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { S3Service } from '../aws/s3/s3.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isRegistred = await this.userService.create(createUserDto);

    if (isRegistred) {
      return {
        message: "Succesfully registred. Please check your email and confirm"
      }
    }

    return {
      message: "Something went wrong, please try again"
    }
  }

  @Get()
  @UseGuards(AuthGuard('check-jwt'))
  findAll(@Request() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch()
  @UseGuards(AuthGuard('check-jwt'))
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req): Promise<IUser> {
    let authId = req.user.id;

    const checkUser = await this.userService.findByUsernameAndEmail(updateUserDto.username)

    if (checkUser && checkUser.id != authId) {
      throw new UnprocessableEntityException({
        error: 'Unprocessible entity',
        messages: [{
          username: 'username value already exists'
        }]
      })
    }

    await this.userService.update(+authId, updateUserDto);

    let user = await this.userService.findOne(authId);

    return {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone
    };
  }

  @UseGuards(AuthGuard('check-jwt'))
  @Post('avatar')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'jpg|png|git',
      })
      .build(),
  ) file: Express.Multer.File, @Request() req) {
    console.log(file);
    console.log(req.user);
    let user_id = req.user.id;
    let avatar_path = `arzin/avatar/${user_id}/`;
    let file_name = file.originalname;

    try {
      /**
      //  Save to local server
        let avatar_path = `public/avatar/${user_id}/`;

        if (!fs.existsSync(avatar_path)) {
          fs.mkdirSync(avatar_path, { recursive: true });
        }
        let file_name = file.originalname;

        fs.writeFileSync(avatar_path + file_name, file.buffer.toString())
      */
      const user = await this.userService.findOne(user_id);
      const isUploaded = await this.s3Service.upload(file, `${avatar_path}`);

      if (isUploaded) {
        if(user.avatar){
          await this.s3Service.delete(`${avatar_path}${user.avatar}`)
        }

        await this.userService.updateAvatar(user_id, file_name)
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Something went wrong")
    }

    // let api_url = this.configService.get<string>('API_URL');
    let s3_url = this.configService.get<string>('AWS_S3_URL');

    return { url: `${s3_url}/${avatar_path}` + file_name };
  }

  @Delete()
  @UseGuards(AuthGuard('check-jwt'))
  delete(@Request() req) {
    return this.userService.remove(+req.user.id);
  }
}
