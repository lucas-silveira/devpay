import { PaymentMethod, ValueObject, Validator } from '@shared/domain-objects';

export class ProviderLiable extends ValueObject {
  public readonly paymentProviderId: string;
  public readonly paymentMethod: PaymentMethod;

  constructor(paymentProviderId: string, paymentMethod: PaymentMethod) {
    super();
    this.setPaymentProviderId(paymentProviderId);
    this.setPaymentMethod(paymentMethod);
  }

  private setPaymentProviderId(anId: string): void {
    Validator.checkIfIsNotEmpty(
      anId,
      'The ProviderLiable paymentProviderId is empty',
    );
    this.setReadOnlyProperty('paymentProviderId', anId);
  }

  private setPaymentMethod(aPaymentMethod: PaymentMethod): void {
    Validator.checkIfIsNotEmpty(
      aPaymentMethod,
      'The ProviderLiable paymentMethod is empty',
    );
    Validator.checkIfIsValidEnum(
      PaymentMethod,
      aPaymentMethod,
      `The ProviderLiable paymentMethod is not accepted: ${aPaymentMethod}`,
    );
    this.setReadOnlyProperty('paymentMethod', aPaymentMethod);
  }
}
