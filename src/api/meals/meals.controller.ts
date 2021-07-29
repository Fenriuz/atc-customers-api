import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { MealsService } from './meals.service';

@Controller(controllerRoutes.meals)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @Get('likes')
  getUserLikes(@Request() { user }) {
    return this.mealsService.findUserLikes(user);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Request() { user }) {
    return this.mealsService.findById(id, user);
  }

  @Post('like/:id')
  likeMeal(@Param('id') id: string) {
    return this.mealsService.likeMeal(id);
  }
}
