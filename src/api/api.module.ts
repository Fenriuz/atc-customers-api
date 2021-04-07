import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { LikesModule } from './likes/likes.module';
import { MealsModule } from './meals/meals.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [MealsModule, RestaurantsModule, CategoriesModule, SectionsModule, LikesModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
