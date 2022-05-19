import {
  AggregateRoot,
  PaymentMethod,
  Validator,
} from '@shared/domain-objects';
import { ProviderType } from './provider-type.enum';

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
    Validator.checkIfIsEmpty(anId, 'The PaymentProvider id is empty');
    this.id = anId.toLowerCase();
  }

  private setType(aType: ProviderType): void {
    Validator.checkIfIsEmpty(aType, 'The PaymentProvider type is empty');
    Validator.checkIfIsAValidEnum(
      ProviderType,
      aType,
      `The PaymentProvider type is not accepted: ${aType}`,
    );
    this.type = aType;
  }

  private setAcceptedPaymentMethods(methods: PaymentMethod[]): void {
    Validator.checkIfIsEmpty(
      methods,
      'The PaymentProvider acceptedPaymentMethods is empty',
    );
    Validator.checkIfIsAValidEnum(
      PaymentMethod,
      methods,
      `The PaymentProvider acceptedPaymentMethods has a not accepted method: ${methods}`,
    );
    this.acceptedPaymentMethods = methods;
  }

  public isThePaymentMethodAccepted(pm: PaymentMethod): boolean {
    return this.acceptedPaymentMethods.includes(pm);
  }
}
