import { DomainEvent } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Utils from '@shared/utils';
import { getAcceptedPolicyIds, PolicyId } from '@domain/policy';
import { getAcceptedPaymentStatus, PaymentStatus } from './payment-status.enum';

export class PaymentEvent extends DomainEvent {
  public readonly pid: string;
  public readonly rid: number;
  public readonly oid: string;
  public readonly policy: PolicyId;
  public readonly status: PaymentStatus;
  public readonly amount: number;
  public readonly paidAmount: number;
  public readonly timestamp: Date;

  constructor(
    pid: string,
    rid: number,
    oid: string,
    policy: PolicyId,
    status: PaymentStatus,
    amount: number,
    paidAmount: number,
    timestamp: Date = new Date(),
  ) {
    super();
    this.setPid(pid);
    this.setRid(rid);
    this.setOid(oid);
    this.setPolicy(policy);
    this.setStatus(status);
    this.setAmount(amount);
    this.setPaidAmount(paidAmount);
    this.timestamp = timestamp;
  }

  static generatePid(): string {
    return Utils.Hash.generateUuidV4();
  }

  private setPid(aPid: string): void {
    if (!aPid) throw new DomainException('The PaymentEvent pid is empty');
    this.setReadOnlyProperty('pid', aPid);
  }

  private setRid(aRid: number): void {
    if (!aRid) throw new DomainException('The PaymentEvent rid is empty');
    this.setReadOnlyProperty('rid', aRid);
  }

  private setOid(anOid: string): void {
    if (!anOid) throw new DomainException('The PaymentEvent oid is empty');
    this.setReadOnlyProperty('oid', anOid);
  }

  private setPolicy(aPolicy: PolicyId): void {
    if (!aPolicy) throw new DomainException('The PaymentEvent policy is empty');

    const isPolicyNotAccepted = !getAcceptedPolicyIds().includes(aPolicy);
    if (isPolicyNotAccepted)
      throw new DomainException(
        `The PaymentEvent policy is not accepted: ${aPolicy}`,
      );

    this.setReadOnlyProperty('policy', aPolicy);
  }

  private setStatus(aStatus: PaymentStatus): void {
    if (!aStatus) throw new DomainException('The PaymentEvent status is empty');

    const isStatusNotAccepted = !getAcceptedPaymentStatus().includes(aStatus);
    if (isStatusNotAccepted)
      throw new DomainException(
        `The PaymentEvent status is not accepted: ${aStatus}`,
      );

    this.setReadOnlyProperty('status', aStatus);
  }

  private setAmount(anAmount: number): void {
    if (!anAmount)
      throw new DomainException('The PaymentEvent amount is empty');
    if (anAmount < 0 || isNaN(anAmount))
      throw new DomainException('The PaymentEvent amount is invalid');

    this.setReadOnlyProperty('amount', Utils.Math.round(anAmount));
  }

  private setPaidAmount(anAmount: number): void {
    if (!anAmount)
      throw new DomainException('The PaymentEvent paidAmount is empty');
    if (anAmount < 0 || isNaN(anAmount))
      throw new DomainException('The PaymentEvent paidAmount is invalid');

    this.setReadOnlyProperty('paidAmount', Utils.Math.round(anAmount));
  }
}
