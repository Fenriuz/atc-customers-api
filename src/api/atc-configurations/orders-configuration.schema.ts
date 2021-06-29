import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class OrdersConfiguration {
  @Prop()
  maxCurrentOrders: number;

  // @Prop()
  // maxMoney
}
