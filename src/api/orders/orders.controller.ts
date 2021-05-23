import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CreateOrderDto } from './order.dto';
import { OrdersService } from './orders.service';

@Controller(controllerRoutes.orders)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.ordersService.create(order);
  }

  @Put(':id/cancel')
  cancelOrder(@Param('id') order: string) {
    return this.ordersService.cancel(order);
  }
}
