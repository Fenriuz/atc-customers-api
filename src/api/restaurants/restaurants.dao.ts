import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurants.schema';

@Injectable()
export class RestaurantsDao {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async findAll(): Promise<RestaurantDocument[]> {
    try {
      return await this.restaurantModel.find().exec();
    } catch (dbErr) {
      return;
    }
  }

  async findById(id: string): Promise<RestaurantDocument> {
    return await this.restaurantModel.findById(id).exec();
  }

  async create(restaurant: Restaurant): Promise<RestaurantDocument> {
    const newRestaurant = new this.restaurantModel(restaurant);
    return await newRestaurant.save();
  }

  async update(restaurant: Restaurant) {
    return 'abr';
  }
}
