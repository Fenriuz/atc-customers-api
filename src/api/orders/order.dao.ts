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

  private async saveOnFirestore(res: OrderDocument) {
    try {
      const db = firestore();

      const docRef = db.collection(mongoCollections.orders).doc(String(res.id));
      const orderFormated = JSON.stringify(res);
      await docRef.set(JSON.parse(orderFormated));
    } catch (e) {
      console.log(e);
      throw new HttpException(httpErrors.createOrder, HttpStatus.CONFLICT);
    }
  }

  async create(order: Order) {
    try {
      const newOrder = new this.orderModel(order);

      (await newOrder.save()).populate(
        {
          path: 'restaurant',
          select: 'displayName',
        },
        (err, res) => {
          if (err) {
            throw new HttpException(httpErrors.createOrder, HttpStatus.CONFLICT);
          }

          this.saveOnFirestore(res);
        },
      );

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
