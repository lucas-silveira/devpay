import { ValueObject } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Utils from '@shared/utils';
import { getAcceptedRecipientTypes, RecipientType } from '@domain/recipient';

export class Requirements extends ValueObject {
  public readonly minAccountMonths: number;
  public readonly recipientType: RecipientType;

  constructor(minAccountMonths: number, recipientType: RecipientType) {
    super();
    this.setMinAccountMonths(minAccountMonths);
    this.setRecipientType(recipientType);
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

  public isEligible(
    accountCreatedAt: Date,
    recipientType: RecipientType,
  ): boolean {
    const accountAgeInMonths = Utils.Date.ageInMonths(accountCreatedAt);
    const isOldEnough = accountAgeInMonths >= this.minAccountMonths;
    const isTypeAccepted = recipientType === this.recipientType;

    return isOldEnough && isTypeAccepted;
  }
}
