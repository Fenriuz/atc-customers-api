import { Inject, Injectable } from '@nestjs/common';
import { CloudinaryService } from '@services/cloudinary/cloudinary.service';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { ScheduleHoursService } from '@shared/services/schedule-hours.service';
import { RestaurantsDao } from './restaurants.dao';
import { CreateRestaurantDto } from './restaurants.dto';
import { RestaurantDocument } from './restaurants.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsDao: RestaurantsDao,
    @Inject(CloudinaryService)
    private readonly _cloudinaryService: CloudinaryService,
    private readonly scheduleHoursService: ScheduleHoursService,
  ) {}

  private getExtraData(restaurantData: RestaurantDocument) {
    const { schedule, ...restaurant } = restaurantData.toJSON();
    const URL = cloudinaryFolders.url;

    const images = {
      cover: `${URL}/${cloudinaryFolders.restaurantCovers}/${restaurant?._id}`,
      logo: `${URL}/${cloudinaryFolders.restaurantLogos}/${restaurant?._id}`,
    };

    const closed = this.scheduleHoursService.isClosed(schedule);

    return { closed, images, ...restaurant };
  }

  async findAll() {
    const records = await this.restaurantsDao.findAll();
    const restaurants = records.map((restaurant) =>
      this.getExtraData(restaurant),
    );

    return restaurants;
  }

  async findById(id: string) {
    const record = await this.restaurantsDao.findById(id);
    const restaurant = this.getExtraData(record);

    return restaurant;
  }

  async create({ images, ...restaurant }: CreateRestaurantDto) {
    const createdRestaurant = await this.restaurantsDao.create(restaurant);

    this._cloudinaryService.upload(
      images?.cover,
      'restaurantCover',
      createdRestaurant?._id,
    );
    this._cloudinaryService.upload(
      images?.logo,
      'restaurantLogo',
      createdRestaurant?._id,
    );

    return createdRestaurant;
  }
}
