import { PaymentStatus } from './payment-status.enum';

export type Payment = {
  id: string;
  recipientId: number;
  policyId: string;
  orderId: string;
  providerId: string;
  status: PaymentStatus;
  amount: number;
  paidAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
