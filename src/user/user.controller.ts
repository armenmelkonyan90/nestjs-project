import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from './user.interface';

@UseGuards(AuthGuard('check-jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
    return {
      message: "Created"
    }
  }

  @Get()
  @UseGuards(AuthGuard('chech-jwt'))
  findAll(@Request() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch()
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

  @Delete()
  delete(@Request() req) {
    return this.userService.remove(+req.user.id);
  }
}
