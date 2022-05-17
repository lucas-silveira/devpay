import { MockBuilder } from '@shared/infra-objects';
import {
  PaymentEvent,
  PaymentEventName,
  PaymentStatus,
  PaymentData,
} from '@domain/payment';

export const PaymentEventPlainObjectBuilder = (): MockBuilder<
  Plain<PaymentEvent>
> =>
  new MockBuilder<Plain<PaymentEvent>>({
    name: PaymentEventName.PaymentCreated,
    pid: '38640e97-ee5a-4437-b10b-59b690b737c3',
    rid: 1,
    pmid: 'stone',
    data: {
      policyId: 'default',
      orderId: '12345',
      status: PaymentStatus.Pending,
      amount: 100,
      paidAmount: 100,
      cardToken: 'card_123',
    },
    timestamp: jasmine.any(Date),
  });

export const PaymentEventDomainObjectBuilder = (): MockBuilder<PaymentEvent> =>
  new MockBuilder<PaymentEvent>(
    new PaymentEvent(
      PaymentEventName.PaymentCreated,
      '38640e97-ee5a-4437-b10b-59b690b737c3',
      1,
      'stone',
      new PaymentData(
        'default',
        '12345',
        PaymentStatus.Pending,
        100,
        100,
        'card_123',
      ),
      new Date(),
    ),
  );
