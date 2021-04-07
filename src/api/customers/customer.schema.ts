import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  readonly _id?: string;

  @Prop()
  readonly uid: string;

  @Prop()
  readonly displayName: string;

  @Prop()
  readonly email: string;

  @Prop()
  readonly phone: string;

  @Prop()
  readonly photoURL: string;

  @Prop()
  readonly password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
