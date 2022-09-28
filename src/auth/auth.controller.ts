import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './dto/user-login.dto';

@Controller()
export class AuthController {

    @UseGuards(AuthGuard('user-login'))
    @Post('user/login')
    userLogin(@Request() req) {
       return req.user
    }

    @Post('admin/login')
    userAdmin() {

    }
}
