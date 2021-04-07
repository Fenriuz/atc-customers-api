import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Meal, MealDocument } from './meals.schema';

@Injectable()
export class MealsDao {
  constructor(@InjectModel(Meal.name) private mealModel: Model<MealDocument>) {}

  async findAll() {
    try {
      return await this.mealModel.find();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllMeals, HttpStatus.CONFLICT);
    }
  }

  async findById(id: string) {
    try {
      return await this.mealModel.findById(id);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneMeal, HttpStatus.NOT_FOUND);
    }
  }
}
