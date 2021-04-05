import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RestaurantLocation } from '@ts/interfaces/restaurant-location';
import { RestaurantImages } from '@ts/interfaces/RestaurantImages';
import { Schedule } from '@ts/interfaces/schedule';
import { Section } from '@ts/interfaces/section';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  _id?: string;

  @Prop()
  displayName?: string;

  @Prop()
  description?: string;

  @Prop()
  schedule?: Schedule;

  @Prop({
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
  locations?: RestaurantLocation;

  @Prop({ default: false })
  disabled?: boolean;

  @Prop()
  categories?: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Meal' }] })
  sections?: Section[];

  images?: RestaurantImages;

  closed?: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
