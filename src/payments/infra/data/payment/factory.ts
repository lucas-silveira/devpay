import * as Nest from '@nestjs/common';
import { LeanDocument, Types as MongoTypes } from 'mongoose';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { Payment } from '@payments/domain';
import { PaymentDocument } from './payment.doc';

export class PaymentFactory {
  public static toDocument(payment: Payment): LeanDocument<PaymentDocument> {
    try {
      const { id, ...paymentToSave } = payment;
      return {
        ...paymentToSave,
        _id: this.convertToObjectId(id),
      };
    } catch (err) {
      new NestAddons.AppLogger(PaymentFactory.name).error(
        new ErrorLog(
          err,
          `Error while creating PaymentDocument from virtual object`,
          {
            payment,
          },
        ),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while creating PaymentDocument from virtual object',
      );
    }
  }

  private static convertToObjectId(anId: string): MongoTypes.ObjectId {
    return new MongoTypes.ObjectId(anId);
  }
}
