import { Payment } from './payment.virtual';

export interface IPaymentsRepository {
  create(payment: Payment): Promise<void>;
  findOneById(id: string): Promise<Payment>;
  findByRecipientId(
    recipientId: number,
    skip?: number,
    limit?: number,
  ): Promise<Payment[]>;
  findByOrderId(
    recipientId: number,
    orderId: string,
    skip?: number,
    limit?: number,
  ): Promise<Payment[]>;
}
