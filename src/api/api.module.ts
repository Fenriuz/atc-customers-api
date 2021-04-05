import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MealsModule } from './meals/meals.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [MealsModule, RestaurantsModule, CategoriesModule, SectionsModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
