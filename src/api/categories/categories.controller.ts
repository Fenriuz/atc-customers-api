import { Controller, Get, Param } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CategoriesService } from './categories.service';

@Controller(controllerRoutes.categories)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }
}
