import { ValueObject, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { AccountType } from '@accounts/domain';

export class Requirements extends ValueObject {
  public readonly minAccountMonths: number;
  public readonly accountType: AccountType;

  constructor(minAccountMonths: number, accountType: AccountType) {
    super();
    this.setMinAccountMonths(minAccountMonths);
    this.setAccountType(accountType);
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

  private setAccountType(aType: AccountType): void {
    Validator.checkIfIsEmpty(aType, 'The Requirements accountType is empty');
    Validator.checkIfIsAValidEnum(
      AccountType,
      aType,
      `The Requirements accountType is not accepted: ${aType}`,
    );
    this.setReadOnlyProperty('accountType', aType);
  }

  public isEligible(accountCreatedAt: Date, accountType: AccountType): boolean {
    const accountAgeInMonths = Utils.Date.ageInMonths(accountCreatedAt);
    const isOldEnough = accountAgeInMonths >= this.minAccountMonths;
    const isTypeAccepted = accountType === this.accountType;

    return isOldEnough && isTypeAccepted;
  }
}
