import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { Like, LikeSchema } from './like.schema';
import { LikesDao } from './likes.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Like.name,
        schema: LikeSchema,
        collection: mongoCollections.likes,
      },
    ]),
  ],
  controllers: [],
  providers: [LikesDao],
  exports: [LikesDao],
})
export class LikesModule {}
