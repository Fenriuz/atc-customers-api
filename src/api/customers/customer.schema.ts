import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  readonly _id?: string;

  @Prop({ unique: true, index: true })
  readonly uid: string;

  @Prop()
  readonly displayName: string;

  @Prop({ unique: true, index: true })
  readonly email: string;

  @Prop({ unique: true, index: true })
  readonly phone: string;

  @Prop()
  readonly photoURL: string;

  @Prop()
  readonly password: string;

  @Prop({ default: false })
  readonly disabled?: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
