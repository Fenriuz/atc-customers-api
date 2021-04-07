import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as mongooseSchema, Document } from 'mongoose';

@Schema()
export class Like {
  _id: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Meal' })
  meal: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Customer' })
  user: string;
}
