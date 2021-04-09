import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurants.schema';
import { RestaurantsDao } from './restaurants.dao';
import { ScheduleHoursModule } from '@shared/modules/schedule-hours.module';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
        collection: mongoCollections.restaurants,
      },
    ]),
    ScheduleHoursModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsDao],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
