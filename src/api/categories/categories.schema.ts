import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  _id: string;

  @Prop()
  displayName: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  disabled?: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
