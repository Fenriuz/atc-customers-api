import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { CustomersDao } from './customers.dao';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { LikesDao } from '../likes/likes.dao';

interface UserAuthenticated {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: any;
  user_id: string;
  sub: string;
  iat: any;
  exp: any;
  email: string;
  email_verified: false;
  firebase: any;
  uid: string;
  _id: string;
}
@Injectable()
export class CustomersService {
  constructor(
    private customersDao: CustomersDao,
    private likesDao: LikesDao,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  getCurrentCustomer() {
    return this.request.user as UserAuthenticated;
  }

  getLikes() {
    const { _id } = this.getCurrentCustomer();

    return this.likesDao.getCustomerLikes(_id);
  }

  create(customer: CreateCustomerDto) {
    return this.customersDao.create(customer);
  }

  update(id: string, customer: UpdateCustomerDto) {
    return this.customersDao.update(id, customer);
  }
}
