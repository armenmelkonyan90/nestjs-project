import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
   constructor(private authService: AuthService, private userServiec: UserService, private configService: ConfigService) { }

   @UseGuards(AuthGuard('user-login'))
   @Post('user/login')
   userLogin(@Request() req) {
      return this.authService.login(req.user)
   }

   @UseGuards(AuthGuard('check-jwt'))
   @Get('auth/user')
   async authUser(@Request() req) {
      let user_id = req.user.id;
      let user = await this.userServiec.findOne(user_id);
      let api_url = this.configService.get<string>('API_URL');

      return {
         id: user.id,
         username: user.username,
         first_name: user.first_name,
         last_name: user.last_name,
         email: user.email,
         phone: user.phone,
         avatar: `${api_url}/avatar/${user_id}/${user.avatar}`
      }
   }

   @Post('admin/login')
   userAdmin() {

   }
}
