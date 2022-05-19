import { ValueObject, Validator } from '@shared/domain-objects';
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
    this.setAmount(amount);
    this.setPaidAmount(paidAmount);
    this.cardToken = cardToken;
  }

  private setStatus(aStatus: PaymentStatus): void {
    if (!aStatus) return;
    Validator.checkIfIsAValidEnum(
      PaymentStatus,
      aStatus,
      `The PaymentEvent status is not accepted: ${aStatus}`,
    );
    this.setReadOnlyProperty('status', aStatus);
  }

  private setAmount(anAmount: Cents): void {
    if (!anAmount) return;
    Validator.checkIfIsNaN(anAmount, 'The PaymentEvent amount is invalid');
    Validator.checkIfIsLowerThanMin(
      anAmount,
      0,
      'The PaymentEvent amount is invalid',
    );
    this.setReadOnlyProperty('amount', Math.round(anAmount));
  }

  private setPaidAmount(anAmount: Cents): void {
    if (!anAmount) return;
    Validator.checkIfIsNaN(anAmount, 'The PaymentEvent amount is invalid');
    Validator.checkIfIsLowerThanMin(
      anAmount,
      0,
      'The PaymentEvent amount is invalid',
    );
    this.setReadOnlyProperty('paidAmount', Math.round(anAmount));
  }
}
