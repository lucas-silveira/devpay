import * as Nest from '@nestjs/common';
import { LeanDocument, Types as MongoTypes } from 'mongoose';
import { ErrorLog } from '@shared/telemetry';
import * as NestAddons from '@shared/nest-addons';
import { PaymentData, PaymentEvent } from '@payments/domain';
import { PaymentDataDocument, PaymentEventDocument } from './payment-event.doc';

export class PaymentEventFactory {
  public static toDocument(
    paymentEvent: PaymentEvent,
  ): LeanDocument<PaymentEventDocument> {
    try {
      return {
        ...paymentEvent,
        pid: this.convertToObjectId(paymentEvent.pid),
        data: this.makeDataDocFrom(paymentEvent.data),
      };
    } catch (err) {
      new NestAddons.AppLogger(PaymentEventFactory.name).error(
        new ErrorLog(
          err,
          `Error while creating PaymentEventDocument from domain object`,
          {
            paymentEvent,
          },
        ),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while creating PaymentEventDocument from domain object',
      );
    }
  }

  private static convertToObjectId(anId: string): MongoTypes.ObjectId {
    return new MongoTypes.ObjectId(anId);
  }

  private static makeDataDocFrom(
    paymentData: PaymentData,
  ): LeanDocument<PaymentDataDocument> {
    return {
      ...paymentData,
      amount: paymentData.amount.value,
      paidAmount: paymentData.paidAmount.value,
    };
  }
}
