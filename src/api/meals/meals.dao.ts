import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Meal, MealDocument } from './meals.schema';
import { Types } from 'mongoose';

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

  async findById(meal: string, customer: string) {
    try {
      const mealId = Types.ObjectId(meal);
      const customerId = Types.ObjectId(customer);

      return await this.mealModel.aggregate([
        {
          $match: { _id: mealId },
        },
        {
          $lookup: {
            from: 'likes',
            pipeline: [
              {
                $match: {
                  $and: [{ customer: customerId }, { meal: mealId }],
                },
              },
            ],
            as: 'liked',
          },
        },
        {
          $lookup: {
            from: 'likes',
            pipeline: [
              {
                $match: {
                  meal: mealId,
                },
              },
              {
                $count: 'count',
              },
            ],
            as: 'counterLikes',
          },
        },
      ]);
    } catch (dbErr) {
      console.log(dbErr);
      throw new HttpException(httpErrors.findOneMeal, HttpStatus.NOT_FOUND);
    }
  }
}
