import {
  Cents,
  ValueObject,
  Validator,
  PaymentMethod,
} from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { ProviderLiable } from './provider-liable.vo';

export class Features extends ValueObject {
  public readonly withdrawLimit: Cents;
  public providerLiables: ProviderLiable[];

  constructor(withdrawLimit: Cents, providerLiables: ProviderLiable[]) {
    super();
    this.setWithdrawLimit(withdrawLimit);
    this.setProviderLiables(providerLiables);
  }

  private setWithdrawLimit(aLimit: Cents): void {
    Validator.checkIfIsNotEmpty(aLimit, 'The Features withdrawLimit is empty');
    this.setReadOnlyProperty('withdrawLimit', aLimit);
  }

  private setProviderLiables(liables: ProviderLiable[]): void {
    Validator.checkIfIsNotEmpty(liables, 'The Policy providerLiables is empty');
    this.providerLiables = liables;
  }

  public paymentProviderFor(aPayMeth: PaymentMethod): string {
    const provLiable = this.providerLiables.find(
      (provLiable: ProviderLiable) => provLiable.paymentMethod === aPayMeth,
    );
    if (!provLiable)
      throw new DomainException(`ProviderLiable not found for ${aPayMeth}`);
    return provLiable.paymentProviderId;
  }
}
