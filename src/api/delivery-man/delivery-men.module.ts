import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';
import { DeliveryMan, DeliveryManSchema } from './delivery-man.schema';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DeliveryMan.name,
        schema: DeliveryManSchema,
        collection: mongoCollections.deliveryMen,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class DeliveryMenModule {}
