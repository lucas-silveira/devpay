import { Cents } from '@shared/domain-objects';
import { Types } from '@shared/infra-objects';
import { MockBuilder } from '@shared/tests';
import {
  PaymentEvent,
  PaymentEventName,
  PaymentStatus,
  PaymentData,
} from '@payments/domain';

export const PaymentEventPlainObjectBuilder = (): MockBuilder<
  Types.Plain<PaymentEvent>
> =>
  new MockBuilder<Types.Plain<PaymentEvent>>({
    name: PaymentEventName.PaymentCreated,
    pid: '38640e97-ee5a-4437-b10b-59b690b737c3',
    rid: 1,
    pmid: 'stone',
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
      '38640e97-ee5a-4437-b10b-59b690b737c3',
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
