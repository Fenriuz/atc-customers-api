import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { firestore } from 'firebase-admin';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Injectable()
export class OrdersDao {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async saveOnFirestore(res: OrderDocument) {
    try {
      const db = firestore();

      const docRef = db.collection(mongoCollections.orders).doc(String(res._id));
      const orderFormated = JSON.stringify(res);
      await docRef.set(JSON.parse(orderFormated));
    } catch (e) {
      throw new HttpException(httpErrors.createOrder, HttpStatus.CONFLICT);
    }
  }

  async create(order: Order) {
    try {
      // const newOrder = new this.orderModel(order).save();

      let newOrder = await this.orderModel.create(order);
      newOrder = await newOrder
        .populate({
          path: 'restaurant deliveryMan customer',
          select: 'displayName phone',
        })
        .execPopulate();

      return newOrder;
    } catch (dbErr) {
      throw new HttpException(httpErrors.createOrder, HttpStatus.CONFLICT);
    }
  }

  async cancel(order: string) {
    try {
      await this.orderModel.findByIdAndUpdate(order, { cancelled: true });
      await this.cancelOnFirestore(order);
    } catch (dbErr) {
      throw new HttpException(httpErrors.cancelOrder, HttpStatus.CONFLICT);
    }
  }
  private async cancelOnFirestore(order: string) {
    try {
      const db = firestore();

      const docRef = db.collection(mongoCollections.orders).doc(order);
      await docRef.update({ cancelled: true });
    } catch (dbErr) {
      throw new HttpException(httpErrors.cancelOrder, HttpStatus.CONFLICT);
    }
  }
}
