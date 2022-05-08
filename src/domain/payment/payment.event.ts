import { DomainEvent } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import * as Utils from '@shared/utils';
import { PaymentData } from './payment-data.vo';

export class PaymentEvent extends DomainEvent {
  public readonly pid: string;
  public readonly rid: number;
  public readonly oid: string;
  public readonly data: PaymentData;
  public readonly timestamp: Date;

  constructor(
    pid: string,
    rid: number,
    oid: string,
    data: PaymentData,
    timestamp: Date = new Date(),
  ) {
    super();
    this.setPid(pid);
    this.setRid(rid);
    this.setOid(oid);
    this.setData(data);
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

  private setData(data: PaymentData): void {
    if (!data) throw new DomainException('The PaymentEvent data is empty');
    this.setReadOnlyProperty('data', data);
  }
}
