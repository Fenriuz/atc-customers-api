import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeliveryManDocument = DeliveryMan & Document;

@Schema()
export class DeliveryMan {
  _id?: string;

  @Prop()
  readonly displayName?: string;

  @Prop({ unique: true, index: true })
  readonly phone?: string;

  @Prop({ unique: true, index: true })
  readonly email?: string;

  @Prop({ default: false })
  readonly disabled?: boolean;
}

export const DeliveryManSchema = SchemaFactory.createForClass(DeliveryMan);
