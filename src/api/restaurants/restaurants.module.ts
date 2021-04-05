import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurants.schema';
import { RestaurantsDao } from './restaurants.dao';
import { CloudinaryModule } from '@services/cloudinary/cloudinary.module';
import { ScheduleHoursModule } from '@shared/modules/schedule-hours.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
        collection: 'restaurants',
      },
    ]),
    CloudinaryModule,
    ScheduleHoursModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsDao],
})
export class RestaurantsModule {}
