import { ValueObject, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { CandidateType } from './candidate-type.enum';

export class Requirements extends ValueObject {
  public readonly minAccountMonths: number;
  public readonly candidateType: CandidateType;

  constructor(minAccountMonths: number, candidateType: CandidateType) {
    super();
    this.setMinAccountMonths(minAccountMonths);
    this.setCandidateType(candidateType);
  }

  private setMinAccountMonths(months: number): void {
    Validator.checkIfIsEmpty(
      months,
      'The Requirements minAccountMonths is empty',
    );
    Validator.checkIfIsNaN(
      months,
      'The Requirements minAccountMonths is not a number',
    );
    Validator.checkIfIsLowerThanMin(
      months,
      0,
      'The Requirements minAccountMonths is lower than 0',
    );
    Validator.checkIfIsNotInteger(
      months,
      'The Requirements minAccountMonths is not integer',
    );
    this.setReadOnlyProperty('minAccountMonths', months);
  }

  private setCandidateType(aType: CandidateType): void {
    Validator.checkIfIsEmpty(aType, 'The Requirements candidateType is empty');
    Validator.checkIfIsInvalidEnum(
      CandidateType,
      aType,
      `The Requirements candidateType is not accepted: ${aType}`,
    );
    this.setReadOnlyProperty('candidateType', aType);
  }

  public isEligible(
    candidateType: CandidateType,
    candidateCreatedAt: Date,
  ): boolean {
    const candidateAgeInMonths = Utils.Date.ageInMonths(candidateCreatedAt);
    const isOldEnough = candidateAgeInMonths >= this.minAccountMonths;
    const isTypeAccepted = candidateType === this.candidateType;

    return isOldEnough && isTypeAccepted;
  }
}
