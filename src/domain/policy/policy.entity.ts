import { AggregateRoot } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { getAccepetedPolicyIds, PolicyId } from './policy-id.enum';

export class Policy extends AggregateRoot {
  public override id: PolicyId;
  public fee: number;
  public createdAt: Date;

  constructor(id: PolicyId, fee: number, createdAt?: Date) {
    super(id);
    this.setId(id);
    this.setFee(fee);
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
}
