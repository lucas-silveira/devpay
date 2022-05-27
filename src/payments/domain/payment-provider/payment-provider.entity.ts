import {
  AggregateRoot,
  PaymentMethod,
  Validator,
} from '@shared/domain-objects';
import { ProviderType } from './provider-type.enum';

export class PaymentProvider extends AggregateRoot {
  public override id: string;
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
    Validator.checkIfIsNotEmpty(anId, 'The PaymentProvider id is empty');
    Validator.checkIfLengthIsNotGreaterThan(
      anId,
      16,
      'The PaymentProvider id is greater than 16 digits',
    );
    this.id = anId.toLowerCase();
  }

  private setType(aType: ProviderType): void {
    Validator.checkIfIsNotEmpty(aType, 'The PaymentProvider type is empty');
    Validator.checkIfIsValidEnum(
      ProviderType,
      aType,
      `The PaymentProvider type is not accepted: ${aType}`,
    );
    this.type = aType;
  }

  private setAcceptedPaymentMethods(methods: PaymentMethod[]): void {
    Validator.checkIfIsNotEmpty(
      methods,
      'The PaymentProvider acceptedPaymentMethods is empty',
    );
    Validator.checkIfIsValidEnum(
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
