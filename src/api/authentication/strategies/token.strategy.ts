import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as passportFirebase from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';
import { CustomersDao } from 'src/api/customers/customers.dao';

@Injectable()
export class TokenStrategy extends PassportStrategy(passportFirebase.Strategy, 'firebase') {
  constructor(private customersDao: CustomersDao) {
    super({
      jwtFromRequest: passportFirebase.ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const customerPayload = await auth().verifyIdToken(token, true);
      if (!customerPayload) {
        throw new Error('Undefined customer payload');
      }
      const { _id } = await this.customersDao.findByUid(customerPayload.uid);

      return { ...customerPayload, _id: String(_id) };
    } catch (e) {
      // console.log(e);
      throw new UnauthorizedException();
    }
  }
}
