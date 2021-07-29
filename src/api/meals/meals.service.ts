import { Injectable } from '@nestjs/common';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { Customer } from '../customers/customer.schema';
import { CustomersService } from '../customers/customers.service';
import { LikesDao } from '../likes/likes.dao';
import { MealsDao } from './meals.dao';
import { Meal } from './meals.schema';

@Injectable()
export class MealsService {
  constructor(
    private mealsDao: MealsDao,
    private likesDao: LikesDao,
    private customersService: CustomersService,
  ) {}

  getMealImage(id: string) {
    const URL = cloudinaryFolders.url;

    const image = `${URL}/${cloudinaryFolders.meals}/${id}`;

    return image;
  }

  normalizedMeal(record: any) {
    const image = this.getMealImage(record?._id);
    const price = record?.price?.toString();
    const likes = record.liked
      ? {
          userHasLiked: Boolean(record?.liked?.length),
          count: record?.counterLikes?.[0]?.count,
        }
      : undefined;
    const meal = {
      image,
      likes,
      ...record,
    };
    delete meal?.price;
    delete meal?.liked;
    delete meal?.counterLikes;
    // delete meal

    return { price, ...meal };
  }

  async findAll() {
    const meals = await this.mealsDao.findAll();
    return meals.map((meal) => this.normalizedMeal(meal.toObject()));
  }

  async findById(id: string, user: Customer) {
    const [record] = await this.mealsDao.findById(id, user._id);
    const meal = this.normalizedMeal(record);

    return meal;
  }

  likeMeal(id: string) {
    const user = this.customersService.getCurrentCustomer();
    return this.likesDao.create(id, user['_id']);
  }

  async findUserLikes(user: string) {
    const meals = await this.likesDao.getCustomerLikes(user);
    const formattedMeals = meals.map((likeDocument) => {
      const { meal, ...restData } = likeDocument.toObject();
      const mealDocument = meal as Meal;
      const normalizedMeal = this.normalizedMeal(mealDocument);

      return { meal: normalizedMeal, ...restData };
    });

    return formattedMeals;
  }
}
