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
    pid: '6290315378d50b220f49626c',
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
