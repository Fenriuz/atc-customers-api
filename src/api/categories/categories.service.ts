import { Injectable } from '@nestjs/common';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { ScheduleHoursService } from '@shared/services/schedule-hours.service';
import { RestaurantDocument } from '../restaurants/restaurants.schema';
import { CategoriesDao } from './categories.dao';

@Injectable()
export class CategoriesService {
  constructor(
    private categoriesDao: CategoriesDao,
    private readonly scheduleHoursService: ScheduleHoursService,
  ) {}

  getExtraData(restaurantData: RestaurantDocument) {
    const { schedule, ...restaurant } = restaurantData;
    const URL = cloudinaryFolders.url;

    const images = {
      cover: `${URL}/${cloudinaryFolders.restaurantCovers}/${restaurant?._id}`,
      logo: `${URL}/${cloudinaryFolders.restaurantLogos}/${restaurant?._id}`,
    };

    const closed = this.scheduleHoursService.isClosedSchedule(schedule);

    return { closed, images, ...restaurant };
  }

  findAll() {
    return this.categoriesDao.findAll();
  }

  async findById(id: string) {
    const [records] = await this.categoriesDao.findById(id);

    const restaurants = records.restaurants.map((record: RestaurantDocument) =>
      this.getExtraData(record),
    );

    return restaurants;
  }
}
