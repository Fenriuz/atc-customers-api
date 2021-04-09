import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model, Types } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurants.schema';

@Injectable()
export class RestaurantsDao {
  populateCategories: { path: string; select: string };

  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {
    this.populateCategories = {
      path: 'categories',
      select: 'displayName description disabled',
    };
  }

  async findAll(): Promise<RestaurantDocument[]> {
    try {
      return await this.restaurantModel
        .find()
        .select('-sections')
        .populate(this.populateCategories);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllRestaurants, HttpStatus.CONFLICT);
    }
  }

  async findById(id: string): Promise<RestaurantDocument> {
    try {
      return await this.restaurantModel.findById(id).populate(this.populateCategories);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllRestaurants, HttpStatus.NOT_FOUND);
    }
  }

  async findSection(restaurantId: string, sectionName: string) {
    try {
      // const _id = Types.ObjectId(restaurantId);

      // return await this.restaurantModel.aggregate([
      // { $match: { _id } },
      // {
      //   $lookup: {
      //     from: 'meals',
      //     pipeline: [
      //       {
      //         $lookup: {
      //           from: 'likes',
      //           localField: 'mobilic.sections.meals',
      //           foreignField: '_id',
      //           as: 'nada',
      //         },
      //       },
      //     ],
      //     as: 'mobilic',
      //   },
      // },
      // { $unwind: '$sections' },
      // {
      //   $lookup: {
      //     from: 'meals',
      //     localField: 'sections.meals',
      //     foreignField: '_id',
      //     as: 'mobilic',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'likes',
      //     localField: 'mobilic._id',
      //     foreignField: 'meal',
      //     as: 'yas',
      //   },
      // },
      // ]);
      return await this.restaurantModel
        .findById(restaurantId)
        .populate({
          path: 'sections.meals',
          select: 'displayName description disabled price',
        })
        .select({ sections: { $elemMatch: { displayName: sectionName } } });
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneSection, HttpStatus.CONFLICT);
    }
  }
}
