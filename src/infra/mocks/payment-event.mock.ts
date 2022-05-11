import {
  PaymentEvent,
  PaymentEventName,
  PaymentStatus,
  PaymentData,
} from '@domain/payment';

export const makePaymentEventPlainObject = (
  args: Partial<PaymentEvent> = {},
): Plain<PaymentEvent> => ({
  name: args.name || PaymentEventName.PaymentCreated,
  pid: args.pid || '38640e97-ee5a-4437-b10b-59b690b737c3',
  rid: args.rid || 1,
  pmid: args.pmid || 'stone',
  data: args.data || {
    policyId: 'default',
    orderId: '12345',
    status: PaymentStatus.Pending,
    amount: 10,
    paidAmount: 10,
  },
  timestamp: args.timestamp || jasmine.any(Date),
});

export const makePaymentEventDomainObject = (
  args: Partial<PaymentEvent> = {},
): PaymentEvent =>
  new PaymentEvent(
    args.name || PaymentEventName.PaymentCreated,
    args.pid || '38640e97-ee5a-4437-b10b-59b690b737c3',
    args.rid || 1,
    args.pmid || 'stone',
    args.data ||
      new PaymentData('default', '12345', PaymentStatus.Pending, 10, 10),
    args.timestamp || new Date(),
  );
