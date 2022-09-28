
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StatusList } from '../user/status.enum';

@Injectable()
export class UserLoginStrategy extends PassportStrategy(Strategy, 'user-login') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException({ message: "Invalid username or password" });
        }

        if (user.status == StatusList.PENDING) {
            throw new UnauthorizedException({ message: "Your profile isn't activated yet" });
        }

        if (user.status == StatusList.BLOCK) {
            throw new UnauthorizedException({ message: "Your profile is blocked" });
        }

        return user;
    }
}