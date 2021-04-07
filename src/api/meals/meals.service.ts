import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMealDto } from './meals.dto';
import { Meal, MealDocument } from './meals.schema';

@Injectable()
export class MealsService {
  constructor(@InjectModel(Meal.name) private mealModel: Model<MealDocument>) {}

  async findAll() {
    try {
      return this.mealModel.find();
    } catch (e) {
      return 'Error';
    }
  }

  async create(restaurant: string, meal: CreateMealDto) {
    try {
      const newMeal = new this.mealModel(meal);
      return await newMeal.save();
    } catch (e) {
      return 'Error';
    }
  }
}
