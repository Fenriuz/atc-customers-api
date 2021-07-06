import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoriesDao {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async findAll() {
    try {
      return await this.categoryModel.find();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllCategories, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string) {
    try {
      const _id = Types.ObjectId(id);
      return await this.categoryModel.aggregate([
        { $match: { _id } },
        {
          $lookup: {
            from: 'restaurants',
            localField: '_id',
            foreignField: 'categories',
            as: 'restaurants',
          },
        },
      ]);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneCategory, HttpStatus.NOT_FOUND);
    }
  }
}
