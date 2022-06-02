import { Cents } from '@shared/domain-objects';
import { Types } from '@shared/infra-objects';
import { MockBuilder } from '@shared/testing';
import {
  PaymentEvent,
  PaymentEventName,
  PaymentStatus,
  PaymentData,
  Payment,
} from '@payments/domain';

export const PaymentEventPlainObjectBuilder = (): MockBuilder<
  Types.Plain<PaymentEvent>
> =>
  new MockBuilder<Types.Plain<PaymentEvent>>({
    name: PaymentEventName.PaymentCreated,
    pid: '6290315378d50b220f49626c',
    rid: 1,
    ppid: 'stone',
    data: {
      policyId: 'default',
      orderId: '12345',
      status: PaymentStatus.Pending,
      amount: { value: 100 },
      paidAmount: { value: 100 },
      cardToken: 'card_123',
    },
    timestamp: jasmine.any(Date),
  });

export const PaymentEventDomainObjectBuilder = (): MockBuilder<PaymentEvent> =>
  new MockBuilder<PaymentEvent>(
    new PaymentEvent(
      PaymentEventName.PaymentCreated,
      '6290315378d50b220f49626c',
      1,
      'stone',
      new PaymentData(
        'default',
        '12345',
        PaymentStatus.Pending,
        new Cents(100),
        new Cents(100),
        'card_123',
      ),
      new Date(),
    ),
  );

export const PaymentPlainObjectBuilder = (): MockBuilder<Payment> =>
  new MockBuilder<Payment>({
    id: '6290315378d50b220f49626c',
    recipientId: 1,
    policyId: 'default',
    orderId: '12345',
    providerId: 'stone',
    status: PaymentStatus.Pending,
    amount: 100,
    paidAmount: 100,
    createdAt: jasmine.any(Date) as any,
    updatedAt: jasmine.any(Date) as any,
  });
