import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';
import { CustomersModule } from './customers/customers.module';
import { DeliveryMenModule } from './delivery-man/delivery-men.module';
import { LikesModule } from './likes/likes.module';
import { MealsModule } from './meals/meals.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    MealsModule,
    RestaurantsModule,
    CategoriesModule,
    SectionsModule,
    LikesModule,
    CustomersModule,
    AuthenticationModule,
    OrdersModule,
    DeliveryMenModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
