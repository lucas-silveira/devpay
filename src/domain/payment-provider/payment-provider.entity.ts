import {
  AggregateRoot,
  getAccepetedPaymentMethods,
  PaymentMethod,
} from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';

export class PaymentProvider extends AggregateRoot {
  public id: string;
  // public type: ProviderType;
  public acceptedPaymentMethods: PaymentMethod[];
  public authToken: string;

  constructor(
    id: string,
    acceptedPaymentMethods: PaymentMethod[],
    authToken: string,
  ) {
    super(id);
    this.setId(id);
    this.setAcceptedPaymentMethods(acceptedPaymentMethods);
    this.authToken = authToken;
  }

  private setId(anId: string): void {
    if (!anId) throw new DomainException('The PaymentProvider id is empty');
    this.id = anId.toLowerCase();
  }

  private setAcceptedPaymentMethods(methods: PaymentMethod[]): void {
    if (!methods || !methods.length)
      throw new DomainException(
        'The PaymentProvider acceptedPaymentMethods is empty',
      );

    const hasNotAcceptedMethod = methods.some(
      (pm) => !getAccepetedPaymentMethods().includes(pm),
    );
    if (hasNotAcceptedMethod)
      throw new DomainException(
        `The PaymentProvider acceptedPaymentMethods has a not accepted method: ${methods}`,
      );

    this.acceptedPaymentMethods = methods;
  }
}
