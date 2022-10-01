import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';


@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('user-login'))
    @Post('user/login')
    userLogin(@Request() req) {
       return this.authService.login(req.user)
    }

    @Post('admin/login')
    userAdmin() {

    }
}
