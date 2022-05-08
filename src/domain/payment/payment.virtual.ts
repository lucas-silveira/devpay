import { Policy } from '@domain/policy';
import { PaymentStatus } from './payment-status.enum';

export type Payment = {
  id: string;
  rid: number;
  oid: string;
  policy: Policy;
  status: PaymentStatus;
  amount: number;
  paidAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
