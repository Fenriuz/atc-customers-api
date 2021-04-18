import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { databaseErrors } from '@shared/constants/database-errors.constants';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';

@Injectable()
export class CustomersDao {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  async findByPhone(phone: string) {
    try {
      return await this.customerModel.findOne({
        phone,
      });
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneCustomer, HttpStatus.CONFLICT);
    }
  }

  async create(customer: Customer) {
    try {
      return await this.customerModel.create(customer);
    } catch (dbErr) {
      throw new HttpException(
        databaseErrors(dbErr, httpErrors.createCustomer),
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(id: string, customer: Customer) {
    try {
      return await this.customerModel.findByIdAndUpdate(id, customer, { new: true });
    } catch (dbErr) {
      throw new HttpException(
        databaseErrors(dbErr, httpErrors.updateCustomer),
        HttpStatus.CONFLICT,
      );
    }
  }
}
