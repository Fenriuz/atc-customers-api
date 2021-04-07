import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CreateMealDto } from './meals.dto';
import { MealsService } from './meals.service';

@Controller(controllerRoutes.meals)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  abr() {
    return this.mealsService.findAll();
  }

  @Post(':id')
  create(@Param('id') id: string, @Body() meal: CreateMealDto) {
    return this.mealsService.create(id, meal);
  }
}
