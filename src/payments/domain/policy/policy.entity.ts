import { AggregateRoot, Validator } from '@shared/domain-objects';
import { Candidate } from './candidate.vo';
import { ProviderLiable } from './provider-liable.vo';
import { Requirements } from './requirements.vo';

export class Policy extends AggregateRoot {
  public override id: string;
  public fee: number;
  public requirements: Requirements;
  public providerLiables: ProviderLiable[];
  public createdAt: Date;

  constructor(
    id: string,
    fee: number,
    requirements: Requirements,
    providerLiables: ProviderLiable[],
    createdAt: Date = new Date(),
  ) {
    super(id);
    this.setId(id);
    this.setFee(fee);
    this.setRequirements(requirements);
    this.setProviderLiables(providerLiables);
    this.createdAt = createdAt;
  }

  private setId(anId: string): void {
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
    Validator.checkIfIsNotEmpty(requirements, 'The Policy requirements is empty');
    this.requirements = requirements;
  }

  private setProviderLiables(liables: ProviderLiable[]): void {
    Validator.checkIfIsNotEmpty(liables, 'The Policy providerLiables is empty');
    this.providerLiables = liables;
  }

  public isEligible(candidate: Candidate): boolean {
    return this.requirements.isEligible(candidate.type, candidate.createdAt);
  }
}
