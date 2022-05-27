import { PaymentEvent } from './payment.event';

export interface IPaymentEventStore {
  append(event: PaymentEvent): Promise<void>;
}
