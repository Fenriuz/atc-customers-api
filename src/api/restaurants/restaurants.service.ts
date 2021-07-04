import { Injectable } from '@nestjs/common';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { ScheduleHoursService } from '@shared/services/schedule-hours.service';
import { MealsService } from '../meals/meals.service';
import { RestaurantsDao } from './restaurants.dao';
import { RestaurantDocument } from './restaurants.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsDao: RestaurantsDao,
    private readonly scheduleHoursService: ScheduleHoursService,
    private readonly mealService: MealsService,
  ) {}

  async isClosedRestaurant(restaurant: RestaurantDocument) {
    const isClosed =
      restaurant?.disabled || this.scheduleHoursService.isClosedSchedule(restaurant?.schedule);

    return isClosed;
  }

  getExtraData(restaurantData: RestaurantDocument) {
    const { schedule, ...restaurant } = restaurantData.toJSON();
    const URL = cloudinaryFolders.url;

    const images = {
      cover: `${URL}/${cloudinaryFolders.restaurantCovers}/${restaurant?._id}`,
      logo: `${URL}/${cloudinaryFolders.restaurantLogos}/${restaurant?._id}`,
    };

    return { schedule, images, ...restaurant };
  }

  async findAll() {
    const records = await this.restaurantsDao.findAll();
    const restaurants = records.map((restaurant) => this.getExtraData(restaurant));

    return restaurants;
  }

  async findById(id: string) {
    const record = await this.restaurantsDao.findById(id);
    const restaurant = this.getExtraData(record);

    return restaurant;
  }

  async findSection(restaurantId: string, currentSection: string) {
    const records = await this.restaurantsDao.findSection(restaurantId, currentSection);
    const { sections, ...restData } = records.toObject();
    const newSections = sections.map(({ meals, ...restSection }) => {
      const normalizedMeals = meals.map((meal) => this.mealService.normalizedMeal(meal));

      return {
        meals: normalizedMeals,
        ...restSection,
      };
    });

    return {
      sections: newSections,
      ...restData,
    };
  }
}
