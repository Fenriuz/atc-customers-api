import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Module } from '@nestjs/common';
import { CustomersDao } from './customers.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './customer.schema';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        collection: mongoCollections.customers,
        schema: CustomerSchema,
      },
    ]),
    LikesModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersDao],
  exports: [CustomersDao, CustomersService],
})
export class CustomersModule {}
