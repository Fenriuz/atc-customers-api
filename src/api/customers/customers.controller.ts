import { Body, Controller, Param, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() customer: UpdateCustomerDto) {
    return this.customersService.update(id, customer);
  }
}
