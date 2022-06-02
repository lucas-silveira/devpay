import * as Nest from '@nestjs/common';
import { Types as MongoTypes } from 'mongoose';
import * as Tests from '@shared/tests';
import * as Mocks from '@payments/infra/mocks';
import { PaymentEventFactory } from '../event-factory';

Tests.databaseScope('PaymentEventFactory', () => {
  it('Should be able to create a plain PaymentEventDocument', () => {
    const paymentEvent = Mocks.PaymentEventDomainObjectBuilder()
      .withoutFields('pid')
      .build();
    const expectedPaymentEventDoc = {
      name: 'payment_created',
      pid: jasmine.any(MongoTypes.ObjectId),
      rid: 1,
      ppid: 'stone',
      data: {
        policyId: 'default',
        orderId: '12345',
        status: 'pending',
        amount: 100,
        paidAmount: 100,
        cardToken: 'card_123',
      },
      timestamp: jasmine.any(Date),
    };
    const paymentEventDoc = PaymentEventFactory.toDocument(paymentEvent);

    expect(paymentEventDoc).toEqual(expectedPaymentEventDoc);
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', () => {
    expect(() => PaymentEventFactory.toDocument(undefined)).toThrowError(
      Nest.InternalServerErrorException,
    );
  });
});
