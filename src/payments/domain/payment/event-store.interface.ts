import { PaymentEvent } from './payment.event';

export interface IPaymentEventStore {
  append(event: PaymentEvent, session?: unknown): Promise<void>;
}
