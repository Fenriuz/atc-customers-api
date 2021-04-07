import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
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
}
