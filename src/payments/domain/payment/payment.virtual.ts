import { PaymentStatus } from './payment-status.enum';

export type Payment = {
  id: string;
  accountId: number;
  policyId: string;
  orderId: string;
  providerLiable: string;
  status: PaymentStatus;
  amount: Cents;
  paidAmount: Cents;
  createdAt: Date;
  updatedAt: Date;
};
