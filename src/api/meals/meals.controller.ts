import { Body, Controller, Get, Param } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CreateMealDto } from './meals.dto';
import { MealsService } from './meals.service';

@Controller(controllerRoutes.meals)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.mealsService.findById(id);
  }
}
