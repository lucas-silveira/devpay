import { Validator, ValueObject } from '@shared/domain-objects';
import { CandidateType } from './candidate-type.enum';

export class Candidate extends ValueObject {
  public name: string;
  public type: CandidateType;
  public createdAt: Date;

  constructor(name: string, type: CandidateType, createdAt: Date) {
    super();
    this.name = name;
    this.setType(type);
    this.setCreatedAt(createdAt);
  }

  private setType(aType: CandidateType): void {
    Validator.checkIfIsNotEmpty(aType, 'The Candidate type is empty');
    Validator.checkIfIsValidEnum(
      CandidateType,
      aType,
      `The Candidate type is not accepted: ${aType}`,
    );
    this.type = aType;
  }

  private setCreatedAt(aDate: Date): void {
    Validator.checkIfIsNotEmpty(aDate, 'The Candidate createdAt is empty');
    this.createdAt = aDate;
  }
}
