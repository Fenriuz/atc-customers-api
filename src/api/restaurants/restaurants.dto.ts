import { RestaurantLocation } from '@ts/interfaces/restaurant-location';
import { RestaurantImages } from '@ts/interfaces/RestaurantImages';
import { Schedule } from '@ts/interfaces/schedule';
export class RestaurantDto {
  readonly displayName?: string;

  readonly description?: string;

  readonly phone?: string;

  readonly email?: string;

  readonly categories?: [];

  readonly sections?: [];

  readonly locations?: RestaurantLocation;

  readonly schedule?: Schedule;

  readonly images?: RestaurantImages;
}
