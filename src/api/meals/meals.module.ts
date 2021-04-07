import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Module } from '@nestjs/common';
import { Meal, MealSchema } from './meals.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MealsDao } from './meals.dao';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema,
        collection: mongoCollections.meals,
      },
    ]),
  ],
  controllers: [MealsController],
  providers: [MealsService, MealsDao],
})
export class MealsModule {}
