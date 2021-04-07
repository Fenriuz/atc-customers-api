import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { CustomersDao } from './customers.dao';

@Injectable()
export class CustomersService {
  constructor(private customersDao: CustomersDao) {}

  create(customer: CreateCustomerDto) {
    return this.customersDao.create(customer);
  }

  update(id: string, customer: UpdateCustomerDto) {
    return this.customersDao.update(id, customer);
  }
}
