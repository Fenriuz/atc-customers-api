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
      return await this.restaurantModel.findById(id).populate({
        path: 'categories sections.meals',
        select: 'displayName description disabled price',
      });
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllRestaurants, HttpStatus.NOT_FOUND);
    }
  }

  async findSection(restaurantId: string, sectionName: string) {
    try {
      // const _id = Types.ObjectId(restaurantId);
      // const mmmunu = [Types.ObjectId('6062a41b9a130803ebeb92a6')];

      // return await this.restaurantModel.aggregate([
      //   { $match: { _id } },
      //   {
      //     // Esto funciona igual que el populate
      //     $lookup: {
      //       from: 'meals',
      //       localField: 'sections.meals',
      //       foreignField: '_id',
      //       as: 'abr',
      //     },
      //     // masooooooooooooooooooo
      //     // $lookup: {
      //     //   from: 'meals',
      //     //   pipeline: [{ $match: { _id: mmmunu } }],
      //     //   as: 'abr',
      //     // },
      //     // $lookup: {
      //     //   from: 'meals',
      //     //   // let: { mealsid: '$sections.meals.abrid' },
      //     //   pipeline: [
      //     //     {
      //     //       $match: {
      //     //         $expr: {
      //     //           $eq: [{ $sections: sectionName }],
      //     //         },
      //     //       },
      //     //       // $match: {
      //     //       //   $expr: { $in: ['$_id', '$$mealsid'] },
      //     //       // },
      //     //     },
      //     //   ],
      //     //   as: 'abr',
      //     // },
      //   },
      //   // {
      //   //   $lookup: {
      //   //     from: 'meals',
      //   //     pipeline: [
      //   //       {
      //   //         $lookup: {
      //   //           from: 'likes',
      //   //           localField: 'mobilic._id',
      //   //           foreignField: 'meals',
      //   //           as: 'nada',
      //   //         },
      //   //       },
      //   //     ],
      //   //     as: 'mobilic',
      //   //   },
      //   // },
      //   // { $unwind: '$sections' },
      //   // {
      //   //   $lookup: {
      //   //     from: 'meals',
      //   //     localField: 'sections.meals',
      //   //     foreignField: '_id',
      //   //     as: 'mobilic',
      //   //   },
      //   // },
      //   // {
      //   //   $lookup: {
      //   //     from: 'likes',
      //   //     localField: 'mobilic._id',
      //   //     foreignField: 'meal',
      //   //     as: 'yas',
      //   //   },
      //   // },
      // ]);
      return await this.restaurantModel
        .findById(restaurantId)
        .populate({
          path: 'sections.meals',
          select: 'displayName description disabled price',
        })
        .select({ sections: { $elemMatch: { displayName: sectionName } } });
    } catch (dbErr) {
      console.log(dbErr);
      throw new HttpException(httpErrors.findOneSection, HttpStatus.CONFLICT);
    }
  }
}
