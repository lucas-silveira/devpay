import { DomainEvent, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { PaymentData } from './payment-data.vo';
import { PaymentEventKey } from './payment-event-key.enum';

export class PaymentEvent extends DomainEvent {
  public override readonly key: PaymentEventKey;
  public readonly pid: string;
  public readonly rid: number;
  public readonly ppid: string;
  public readonly data: PaymentData;
  public readonly timestamp: Date;

  constructor(
    key: PaymentEventKey,
    pid: string,
    rid: number,
    ppid: string,
    data: PaymentData,
    timestamp: Date = new Date(),
  ) {
    super(key);
    this.setPid(pid);
    this.setRid(rid);
    this.setPpid(ppid);
    this.setData(data);
    this.timestamp = timestamp;
  }

  protected override setKey(aKey: PaymentEventKey): void {
    Validator.checkIfIsNotEmpty(aKey, 'The PaymentEvent key is empty');
    Validator.checkIfIsValidEnum(
      PaymentEventKey,
      aKey,
      `The PaymentEvent key is not accepted: ${aKey}`,
    );
    this.setReadOnlyProperty('key', aKey);
  }

  private setPid(aPid: string): void {
    const pid = aPid || Utils.Hash.generateObjectId();
    this.setReadOnlyProperty('pid', pid);
  }

  private setRid(aRid: number): void {
    Validator.checkIfIsNotEmpty(aRid, 'The PaymentEvent rid is empty');
    this.setReadOnlyProperty('rid', aRid);
  }

  private setPpid(aPpid: string): void {
    Validator.checkIfIsNotEmpty(aPpid, 'The PaymentEvent ppid is empty');
    this.setReadOnlyProperty('ppid', aPpid);
  }

  private setData(data: PaymentData): void {
    Validator.checkIfIsNotEmpty(data, 'The PaymentEvent data is empty');
    this.setReadOnlyProperty('data', data);
  }
}
