import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Meal } from '../meals/meals.schema';
import { Schema as mongooseSchema, Document } from 'mongoose';

export type SectionDocument = Section & Document;

export class Section {
  _id: string;

  @Prop()
  displayName: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Meal' }] })
  meals?: Meal[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
