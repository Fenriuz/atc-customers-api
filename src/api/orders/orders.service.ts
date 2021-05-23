import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { CustomersService } from '../customers/customers.service';
import { MealsDao } from '../meals/meals.dao';
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
  ) {}

  async create({ meals: orderMeals, ...order }: CreateOrderDto) {
    const restaurant = await this.restaurantsDao.findById(order.restaurant);
    const restaurantClosed = await this.restaurantsService.isClosedRestaurant(restaurant);
    if (restaurantClosed) {
      throw new HttpException(httpErrors.closedRestaurant, HttpStatus.BAD_REQUEST);
    }

    const mealsIds = orderMeals.map(({ _id }) => _id);
    const mealsInfo = await this.mealsDao.findByIds(mealsIds);

    const meals = mealsInfo.map(({ _id, displayName, price }) => {
      const mealData = orderMeals?.find((meal) => meal._id === String(_id));

      return {
        displayName,
        price,
        ...mealData,
      };
    });

    const customer = this.customersService.getCurrentCustomer()._id;

    return this.ordersDao.create({ meals, customer, ...order });
  }

  cancel(order: string) {
    return this.ordersDao.cancel(order);
  }
}
