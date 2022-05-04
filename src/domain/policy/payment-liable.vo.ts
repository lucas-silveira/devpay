import {
  getAccepetedPaymentMethods,
  PaymentMethod,
  ValueObject,
} from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';

export class PaymentLiable extends ValueObject {
  public readonly paymentProviderId: string;
  public readonly paymentMethod: PaymentMethod;

  constructor(paymentProviderId: string, paymentMethod: PaymentMethod) {
    super();
    this.setPaymentProviderId(paymentProviderId);
    this.setPaymentMethod(paymentMethod);
  }

  private setPaymentProviderId(anId: string): void {
    if (!anId)
      throw new DomainException('The PaymentLiable paymentProviderId is empty');
    this.setReadOnlyProperty('paymentProviderId', anId);
  }

  private setPaymentMethod(aPaymentMethod: PaymentMethod): void {
    if (!aPaymentMethod)
      throw new DomainException('The PaymentLiable paymentMethod is empty');

    const isPaymentMethodNotAccepted =
      !getAccepetedPaymentMethods().includes(aPaymentMethod);
    if (isPaymentMethodNotAccepted)
      throw new DomainException(
        `The PaymentLiable paymentMethod is not accepted: ${aPaymentMethod}`,
      );

    this.setReadOnlyProperty('paymentMethod', aPaymentMethod);
  }
}
