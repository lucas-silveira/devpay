import { AggregateRoot } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import { Recipient } from '@domain/recipient';
import { PaymentLiable } from './payment-liable.vo';
import { getAcceptedPolicyIds, PolicyId } from './policy-id.enum';
import { Requirements } from './requirements.vo';

export class Policy extends AggregateRoot {
  public override id: PolicyId;
  public fee: number;
  public requirements: Requirements;
  public paymentLiables: PaymentLiable[];
  public createdAt: Date;

  constructor(
    id: PolicyId,
    fee: number,
    requirements: Requirements,
    paymentLiables: PaymentLiable[],
    createdAt: Date = new Date(),
  ) {
    super(id);
    this.setId(id);
    this.setFee(fee);
    this.setRequirements(requirements);
    this.setPaymentLiables(paymentLiables);
    this.createdAt = createdAt;
  }

  private setId(anId: PolicyId): void {
    if (!anId) throw new DomainException('The Policy id is empty');

    const isPolicyIdNotAccepted = !getAcceptedPolicyIds().includes(anId);
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

  private setPaymentLiables(liables: PaymentLiable[]): void {
    if (!liables || !liables.length)
      throw new DomainException('The Policy paymentLiables is empty');
    this.paymentLiables = liables;
  }

  public isEligible(recipient: Recipient): boolean {
    return this.requirements.isEligible(recipient.createdAt, recipient.type);
  }
}
