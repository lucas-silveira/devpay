import { Payment } from './payment.virtual';

export interface IPaymentsRepository {
  create(payment: Payment): Promise<void>;
  findOneById(id: string): Promise<Payment>;
  findByRecipientId(recipientId: number): Promise<Payment[]>;
  findByOrderId(orderId: string): Promise<Payment[]>;
}
