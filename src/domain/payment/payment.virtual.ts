import { PaymentStatus } from './payment-status.enum';

export type Payment = {
  id: string;
  recipientId: number;
  policyId: string;
  orderId: string;
  providerLiable: string;
  status: PaymentStatus;
  amount: Cents;
  paidAmount: Cents;
  createdAt: Date;
  updatedAt: Date;
};
