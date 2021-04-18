// import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as passportFirebase from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';

@Injectable()
export class TokenStrategy extends PassportStrategy(passportFirebase.Strategy, 'firebase') {
  constructor() {
    super({
      jwtFromRequest: passportFirebase.ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token) {
    return auth()
      .verifyIdToken(token, true)
      .catch(() => {
        throw new UnauthorizedException();
      });
  }
}
