import { Injectable } from '@nestjs/common';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { LikesDao } from '../likes/likes.dao';
import { MealsDao } from './meals.dao';

@Injectable()
export class MealsService {
  constructor(private mealsDao: MealsDao, private likesDao: LikesDao) {}

  getMealImage(id: string) {
    const URL = cloudinaryFolders.url;

    const image = `${URL}/${cloudinaryFolders.meals}/${id}`;

    return image;
  }

  normalizedMeal(record: any) {
    const image = this.getMealImage(record?._id);
    const price = record?.price?.toString();
    const likes = {
      userHasLiked: Boolean(record?.liked?.length),
      count: record?.counterLikes[0]?.count,
    };
    const meal = {
      image,
      likes,
      ...record,
    };
    delete meal?.price;
    delete meal?.liked;

    return { price, ...meal };
  }

  findAll() {
    return this.mealsDao.findAll();
  }

  async findById(id: string) {
    const [record] = await this.mealsDao.findById(id, '606e771eb187f605e38ff471');
    const meal = this.normalizedMeal(record);

    return meal;
  }

  likeMeal(id: string) {
    return this.likesDao.create(id, '606e771eb187f605e38ff471');
  }
}
