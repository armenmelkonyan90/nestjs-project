import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsernameAndEmail(username);
        
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, id: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
