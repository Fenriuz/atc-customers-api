import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Module } from '@nestjs/common';
import { OrdersDao } from './order.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { Order, OrderSchema } from './order.schema';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { MealsModule } from '../meals/meals.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
        collection: mongoCollections.orders,
      },
    ]),
    RestaurantsModule,
    MealsModule,
    CustomersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersDao],
})
export class OrdersModule {}
