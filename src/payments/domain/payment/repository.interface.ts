import { Payment } from './payment.virtual';

export interface IPaymentsRepository {
  findOneById(id: string): Promise<Payment>;
  findByRecipientId(recipientId: number): Promise<Payment[]>;
  findByOrderId(orderId: string): Promise<Payment[]>;
}
