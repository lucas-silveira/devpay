import * as Nest from '@nestjs/common';
import { Types as MongoTypes } from 'mongoose';
import * as Tests from '@shared/testing';
import * as Mocks from '@payments/infra/mocks';
import { PaymentFactory } from '../factory';

Tests.databaseScope('PaymentFactory', () => {
  it('Should be able to create a plain PaymentDocument', () => {
    const payment = Mocks.PaymentPlainObjectBuilder()
      .withFields({
        createdAt: new Date(),
      })
      .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
      .build();
    const expectedPaymentDoc = {
      ...payment,
      id: undefined,
      _id: jasmine.any(MongoTypes.ObjectId),
    };
    const paymentDoc = PaymentFactory.toDocument(payment);

    expect(paymentDoc).toEqual(expectedPaymentDoc);
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', () => {
    expect(() => PaymentFactory.toDocument(undefined)).toThrowError(
      Nest.InternalServerErrorException,
    );
  });
});
