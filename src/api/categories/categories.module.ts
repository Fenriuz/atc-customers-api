import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { Category, CategorySchema } from './category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
        collection: mongoCollections.categories,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class CategoriesModule {}
