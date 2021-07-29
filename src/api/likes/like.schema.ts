import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema, Document } from 'mongoose';
import { Meal } from '../meals/meals.schema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  _id?: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Meal' })
  meal: string | Meal;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Customer' })
  customer: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
