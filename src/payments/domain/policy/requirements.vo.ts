import { ValueObject, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { RecipientType } from '../recipient';

export class Requirements extends ValueObject {
  public readonly minAccountMonths: number;
  public readonly recipientType: RecipientType;

  constructor(minAccountMonths: number, recipientType: RecipientType) {
    super();
    this.setMinAccountMonths(minAccountMonths);
    this.setRecipientType(recipientType);
  }

  private setMinAccountMonths(months: number): void {
    Validator.checkIfIsEmpty(
      months,
      'The Requirements minAccountMonths is empty',
    );
    Validator.checkIfIsNaN(
      months,
      'The Requirements minAccountMonths is invalid',
    );
    Validator.checkIfIsLowerThanMin(
      months,
      0,
      'The Requirements minAccountMonths is invalid',
    );
    Validator.checkIfIsInteger(
      months,
      'The Requirements minAccountMonths is invalid',
    );
    this.setReadOnlyProperty('minAccountMonths', months);
  }

  private setRecipientType(aType: RecipientType): void {
    Validator.checkIfIsEmpty(aType, 'The Requirements recipientType is empty');
    Validator.checkIfIsAValidEnum(
      RecipientType,
      aType,
      `The Requirements recipientType is not accepted: ${aType}`,
    );
    this.setReadOnlyProperty('recipientType', aType);
  }

  public isEligible(
    recipientCreatedAt: Date,
    recipientType: RecipientType,
  ): boolean {
    const recipientAgeInMonths = Utils.Date.ageInMonths(recipientCreatedAt);
    const isOldEnough = recipientAgeInMonths >= this.minAccountMonths;
    const isTypeAccepted = recipientType === this.recipientType;

    return isOldEnough && isTypeAccepted;
  }
}
