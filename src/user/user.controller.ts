import { Controller, UseInterceptors, InternalServerErrorException, ParseFilePipeBuilder, UploadedFile, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from './user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
    return {
      message: "Created"
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
    let user_id = req.user.id;
    let avatar_path = `public/avatar/${user_id}/`;

    try {
      if (!fs.existsSync(avatar_path)) {
        fs.mkdirSync(avatar_path, { recursive: true });
      }
      let file_name = file.originalname;

      fs.writeFileSync(avatar_path + file_name, file.buffer.toString())

      await this.userService.updateAvatar(user_id, file_name)
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Something went wrong")
    }

    let api_url = this.configService.get<string>('API_URL');

    return { url: `${api_url}/avatar/${user_id}/` + file.originalname };
  }

  @Delete()
  @UseGuards(AuthGuard('check-jwt'))
  delete(@Request() req) {
    return this.userService.remove(+req.user.id);
  }
}
