import { Injectable } from '@nestjs/common';
import { CustomersDao } from '../customers/customers.dao';

@Injectable()
export class AuthenticationService {
  constructor(private customersDao: CustomersDao) {}

  async findByPhone(phone: string) {
    const user = await this.customersDao.findByPhone(phone);
    if (user) {
      return {
        isRegister: true,
        email: user.email,
      };
    }

    return {
      isRegister: false,
    };
  }
}
