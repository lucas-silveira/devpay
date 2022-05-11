import { AggregateRoot, Validator } from '@shared/domain-objects';
import { Recipient } from '@domain/recipient';
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
    Validator.checkIfIsEmpty(anId, 'The Policy id is empty');
    this.id = anId;
  }

  private setFee(aNumber: number): void {
    Validator.checkIfIsEmpty(aNumber, 'The Policy fee is empty');
    this.fee = aNumber;
  }

  private setRequirements(requirements: Requirements): void {
    Validator.checkIfIsEmpty(requirements, 'The Policy requirements is empty');
    this.requirements = requirements;
  }

  private setProviderLiables(liables: ProviderLiable[]): void {
    Validator.checkIfIsEmpty(liables, 'The Policy providerLiables is empty');
    this.providerLiables = liables;
  }

  public isEligible(recipient: Recipient): boolean {
    return this.requirements.isEligible(recipient.createdAt, recipient.type);
  }
}
