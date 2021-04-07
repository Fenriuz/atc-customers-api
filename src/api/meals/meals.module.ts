import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Module } from '@nestjs/common';
import { Meal, MealSchema } from './meals.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema,
        collection: 'meals',
      },
    ]),
  ],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
