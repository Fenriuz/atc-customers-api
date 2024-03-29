import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Module } from '@nestjs/common';
import { Meal, MealSchema } from './meals.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MealsDao } from './meals.dao';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { LikesModule } from '../likes/likes.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema,
        collection: mongoCollections.meals,
      },
    ]),
    LikesModule,
    CustomersModule,
  ],
  controllers: [MealsController],
  providers: [MealsService, MealsDao],
  exports: [MealsService, MealsDao],
})
export class MealsModule {}
