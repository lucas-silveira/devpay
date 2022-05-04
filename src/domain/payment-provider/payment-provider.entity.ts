import {
  AggregateRoot,
  getAcceptedPaymentMethods,
  PaymentMethod,
} from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { getAcceptedProviderTypes, ProviderType } from './provider-type.enum';

export class PaymentProvider extends AggregateRoot {
  public id: string;
  public type: ProviderType;
  public acceptedPaymentMethods: PaymentMethod[];
  public authToken: string;

  constructor(
    id: string,
    type: ProviderType,
    acceptedPaymentMethods: PaymentMethod[],
    authToken: string,
  ) {
    super(id);
    this.setId(id);
    this.setType(type);
    this.setAcceptedPaymentMethods(acceptedPaymentMethods);
    this.authToken = authToken;
  }

  private setId(anId: string): void {
    if (!anId) throw new DomainException('The PaymentProvider id is empty');
    this.id = anId.toLowerCase();
  }

  private setType(aType: ProviderType): void {
    if (!aType) throw new DomainException('The PaymentProvider type is empty');

    const isTypeNotAccepted = !getAcceptedProviderTypes().includes(aType);
    if (isTypeNotAccepted)
      throw new DomainException(
        `The PaymentProvider type is not accepted: ${aType}`,
      );

    this.type = aType;
  }

  private setAcceptedPaymentMethods(methods: PaymentMethod[]): void {
    if (!methods || !methods.length)
      throw new DomainException(
        'The PaymentProvider acceptedPaymentMethods is empty',
      );

    const hasNotAcceptedMethod = methods.some(
      (pm) => !getAcceptedPaymentMethods().includes(pm),
    );
    if (hasNotAcceptedMethod)
      throw new DomainException(
        `The PaymentProvider acceptedPaymentMethods has a not accepted method: ${methods}`,
      );

    this.acceptedPaymentMethods = methods;
  }

  public isThePaymentMethodAccepted(pm: PaymentMethod): boolean {
    return this.acceptedPaymentMethods.includes(pm);
  }
}
