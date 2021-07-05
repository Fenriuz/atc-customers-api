import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { CustomersService } from '../customers/customers.service';
import { MealsDao } from '../meals/meals.dao';
import { MealsService } from '../meals/meals.service';
import { RestaurantsDao } from '../restaurants/restaurants.dao';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { OrdersDao } from './order.dao';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private ordersDao: OrdersDao,
    private customersService: CustomersService,
    private restaurantsService: RestaurantsService,
    private restaurantsDao: RestaurantsDao,
    private mealsDao: MealsDao,
    private mealsService: MealsService,
  ) {}

  async create({ meals: orderMeals, restaurant, location }: CreateOrderDto) {
    const restaurantRecord = await this.restaurantsDao.findById(restaurant);
    const restaurantClosed = await this.restaurantsService.isClosedRestaurant(restaurantRecord);
    if (restaurantClosed) {
      throw new HttpException(httpErrors.closedRestaurant, HttpStatus.BAD_REQUEST);
    }

    const mealsIds = orderMeals.map(({ _id }) => _id);
    const mealsInfo = await this.mealsDao.findByIds(mealsIds);

    const meals = mealsInfo.map(({ _id, displayName, price }) => {
      const mealData = orderMeals?.find((meal) => meal._id === String(_id));

      const image = this.mealsService.getMealImage(String(_id));

      return {
        displayName,
        price,
        image,
        ...mealData,
      };
    });

    const { _id: customer, uid: customer_uid } = this.customersService.getCurrentCustomer();

    let newOrder: any = await this.ordersDao.create({
      meals,
      customer,
      customer_uid,
      restaurant,
      location,
    });
    newOrder = await newOrder.toObject();

    newOrder['restaurant']['images'] = this.restaurantsService.getRestaurantImages(restaurant);

    console.log(newOrder);

    return await this.ordersDao.saveOnFirestore(newOrder);
  }

  cancel(order: string) {
    return this.ordersDao.cancel(order);
  }
}
