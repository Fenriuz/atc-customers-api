import { Body, Controller, Post, Put, Get } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { Public } from '../authentication/decorators/public.decorator';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { CustomersService } from './customers.service';

@Controller(controllerRoutes.customers)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Public()
  @Post()
  create(@Body() customer: CreateCustomerDto) {
    return this.customersService.create(customer);
  }

  @Put('me')
  update(@Body() customer: UpdateCustomerDto) {
    return this.customersService.update(customer);
  }

  @Get('me')
  getMe() {
    return this.customersService.getMe();
  }
}
