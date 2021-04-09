import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { Category, CategorySchema } from './category.schema';
import { CategoriesDao } from './categories.dao';
import { ScheduleHoursModule } from '@shared/modules/schedule-hours.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
        collection: mongoCollections.categories,
      },
    ]),
    ScheduleHoursModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesDao],
})
export class CategoriesModule {}
