import { ValueObject } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { getAcceptedRecipientTypes, RecipientType } from '@domain/recipient';

export class Requirements extends ValueObject {
  public readonly minTransactionalValue: number;
  public readonly minAccountMonths: number;
  public readonly recipientType: RecipientType;

  constructor(
    minTransactionalValue: number,
    minAccountMonths: number,
    recipientType: RecipientType,
  ) {
    super();
    this.setMinTransactionalValue(minTransactionalValue);
    this.setMinAccountMonths(minAccountMonths);
    this.setRecipientType(recipientType);
  }

  private setMinTransactionalValue(aValue: number): void {
    if (!aValue)
      throw new DomainException(
        'The Requirements setMinTransactionalValue is empty',
      );
    if (aValue < 0 || isNaN(aValue))
      throw new DomainException(
        'The Requirements setMinTransactionalValue is invalid',
      );
    this.setReadOnlyProperty('minTransactionalValue', aValue);
  }

  private setMinAccountMonths(months: number): void {
    if (!months)
      throw new DomainException('The Requirements minAccountMonths is empty');
    if (months < 0 || isNaN(months) || !Number.isInteger(months))
      throw new DomainException('The Requirements minAccountMonths is invalid');

    this.setReadOnlyProperty('minAccountMonths', months);
  }

  private setRecipientType(aType: RecipientType): void {
    if (!aType)
      throw new DomainException('The Requirements recipientType is empty');

    const isTypeNotAccepted = !getAcceptedRecipientTypes().includes(aType);
    if (isTypeNotAccepted)
      throw new DomainException(
        `The Requirements recipientType is not accepted: ${aType}`,
      );

    this.setReadOnlyProperty('recipientType', aType);
  }
}
