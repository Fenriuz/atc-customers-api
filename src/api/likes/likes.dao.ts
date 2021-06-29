import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './like.schema';

@Injectable()
export class LikesDao {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async getCustomerLikes(customer: string) {
    try {
      return await this.likeModel.find({ customer }).populate({
        path: 'meal',
      });
    } catch (dbErr) {
      throw new HttpException(httpErrors.getLikes, HttpStatus.CONFLICT);
    }
  }

  async create(mealId: string, customerId: string) {
    try {
      const snap = await this.likeModel.findOne({
        meal: mealId,
        customer: customerId,
      });

      if (snap) {
        return await this.likeModel.findByIdAndDelete(snap?._id);
      }

      const newLike = new this.likeModel({
        meal: mealId,
        customer: customerId,
      });

      return await newLike.save();
    } catch (dbErr) {
      throw new HttpException(httpErrors.createCustomer, HttpStatus.CONFLICT);
    }
  }
}
