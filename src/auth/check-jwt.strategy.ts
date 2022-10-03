import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CheckJwtStrategy extends PassportStrategy(Strategy, 'check-jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_USER_SECRET_KEY'),
    });
  }

  async validate(payload: User) {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name
    };
  }
}