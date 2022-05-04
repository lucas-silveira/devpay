import { AggregateRoot } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { getAccepetedPolicyIds, PolicyId } from './policy-id.enum';
import { Requirements } from './requirements.vo';

export class Policy extends AggregateRoot {
  public override id: PolicyId;
  public fee: number;
  public requirements: Requirements;
  public createdAt: Date;

  constructor(
    id: PolicyId,
    fee: number,
    requirements: Requirements,
    createdAt?: Date,
  ) {
    super(id);
    this.setId(id);
    this.setFee(fee);
    this.setRequirements(requirements);
    this.createdAt = createdAt || new Date();
  }

  private setId(anId: PolicyId): void {
    if (!anId) throw new DomainException('The Policy id is empty');

    const isPolicyIdNotAccepted = !getAccepetedPolicyIds().includes(anId);
    if (isPolicyIdNotAccepted)
      throw new DomainException(`The Policy id is not accepted: ${anId}`);

    this.id = anId;
  }

  private setFee(aNumber: number): void {
    if (!aNumber) throw new DomainException('The Policy fee is empty');
    this.fee = aNumber;
  }

  private setRequirements(requirements: Requirements): void {
    if (!requirements)
      throw new DomainException('The Policy requirements is empty');
    this.requirements = requirements;
  }
}
