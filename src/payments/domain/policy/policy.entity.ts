import {
  AggregateRoot,
  PaymentMethod,
  Validator,
} from '@shared/domain-objects';
import { Candidate } from './candidate.vo';
import { Features } from './features.vo';
import { Requirements } from './requirements.vo';

export class Policy extends AggregateRoot {
  public override id: string;
  public fee: number;
  public requirements: Requirements;
  public features: Features;
  public createdAt: Date;

  constructor(
    id: string,
    fee: number,
    requirements: Requirements,
    features: Features,
    createdAt: Date = new Date(),
  ) {
    super(id);
    this.setFee(fee);
    this.setRequirements(requirements);
    this.setFeatures(features);
    this.createdAt = createdAt;
  }

  protected override setId(anId: string): void {
    Validator.checkIfIsNotEmpty(anId, 'The Policy id is empty');
    Validator.checkIfLengthIsNotGreaterThan(
      anId,
      16,
      'The Policy id is greater than 16 digits',
    );
    this.id = anId;
  }

  private setFee(aNumber: number): void {
    Validator.checkIfIsNotEmpty(aNumber, 'The Policy fee is empty');
    this.fee = aNumber;
  }

  private setRequirements(requirements: Requirements): void {
    Validator.checkIfIsNotEmpty(
      requirements,
      'The Policy requirements is empty',
    );
    this.requirements = requirements;
  }

  private setFeatures(features: Features): void {
    Validator.checkIfIsNotEmpty(features, 'The Policy features is empty');
    this.features = features;
  }

  public isEligible(candidate: Candidate): boolean {
    return this.requirements.isEligible(candidate.type, candidate.createdAt);
  }

  public paymentProviderFor(aPayMeth: PaymentMethod): string {
    return this.features.paymentProviderFor(aPayMeth);
  }
}
