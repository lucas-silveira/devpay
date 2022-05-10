import { PaymentStatus } from './payment-status.enum';

export type Payment = {
  id: string;
  recipientId: number;
  orderId: string;
  policyId: string;
  status: PaymentStatus;
  amount: number;
  paidAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
