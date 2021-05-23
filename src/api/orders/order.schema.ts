import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LocationCustomer } from '@ts/interfaces/customers';
import { MealsOrder } from '@ts/interfaces/meals';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type OrderDocument = Document & Order;

@Schema()
export class Order {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Restaurant' })
  readonly restaurant: string;

  @Prop()
  readonly meals: MealsOrder[];

  @Prop({
    description: String,
    reference: String,
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  readonly location: LocationCustomer;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Customer' })
  readonly customer: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'DeliveryMan', default: null })
  readonly deliveryMan?: string;

  @Prop({ type: Boolean, default: false })
  readonly cancelled?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
