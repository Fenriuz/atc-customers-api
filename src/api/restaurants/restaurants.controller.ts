import { Controller, Get, Param } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { RestaurantsService } from './restaurants.service';

@Controller(controllerRoutes.restaurants)
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.restaurantsService.findById(id);
  }
}
