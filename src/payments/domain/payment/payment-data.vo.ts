import { ValueObject, Validator, Cents } from '@shared/domain-objects';
import { PaymentStatus } from './payment-status.enum';

export class PaymentData extends ValueObject {
  public readonly policyId?: string;
  public readonly orderId?: string;
  public readonly status?: PaymentStatus;
  public readonly amount?: Cents;
  public readonly paidAmount?: Cents;
  public readonly cardToken?: string;

  constructor(
    policyId?: string,
    orderId?: string,
    status?: PaymentStatus,
    amount?: Cents,
    paidAmount?: Cents,
    cardToken?: string,
  ) {
    super();
    this.policyId = policyId;
    this.orderId = orderId;
    this.setStatus(status);
    this.amount = amount;
    this.paidAmount = paidAmount;
    this.cardToken = cardToken;
  }

  private setStatus(aStatus: PaymentStatus): void {
    if (!aStatus) return;
    Validator.checkIfIsInvalidEnum(
      PaymentStatus,
      aStatus,
      `The PaymentEvent status is not accepted: ${aStatus}`,
    );
    this.setReadOnlyProperty('status', aStatus);
  }
}
