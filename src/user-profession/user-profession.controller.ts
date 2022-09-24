import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfessionService } from './user-profession.service';
import { CreateUserProfessionDto } from './dto/create-user-profession.dto';
import { UpdateUserProfessionDto } from './dto/update-user-profession.dto';

@Controller('user-profession')
export class UserProfessionController {
  constructor(private readonly userProfessionService: UserProfessionService) {}

  @Post()
  create(@Body() createUserProfessionDto: CreateUserProfessionDto) {
    return this.userProfessionService.create(createUserProfessionDto);
  }

  @Get()
  findAll() {
    return this.userProfessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProfessionDto: UpdateUserProfessionDto) {
    return this.userProfessionService.update(+id, updateUserProfessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfessionService.remove(+id);
  }
}
