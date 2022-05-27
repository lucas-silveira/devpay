import { DomainEvent, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { PaymentData } from './payment-data.vo';
import { PaymentEventName } from './payment-event-name.enum';

export class PaymentEvent extends DomainEvent {
  public readonly name: PaymentEventName;
  public readonly pid: string;
  public readonly rid: number;
  public readonly ppid: string;
  public readonly data: PaymentData;
  public readonly timestamp: Date;

  constructor(
    name: PaymentEventName,
    pid: string,
    rid: number,
    ppid: string,
    data: PaymentData,
    timestamp: Date = new Date(),
  ) {
    super();
    this.setName(name);
    this.setPid(pid);
    this.setRid(rid);
    this.setPpid(ppid);
    this.setData(data);
    this.timestamp = timestamp;
  }

  private setName(aName: PaymentEventName): void {
    Validator.checkIfIsEmpty(aName, 'The PaymentEvent name is empty');
    Validator.checkIfIsInvalidEnum(
      PaymentEventName,
      aName,
      `The PaymentEvent name is not accepted: ${aName}`,
    );
    this.setReadOnlyProperty('name', aName);
  }

  private setPid(aPid: string): void {
    const pid = aPid || Utils.Hash.generateObjectId();
    this.setReadOnlyProperty('pid', pid);
  }

  private setRid(aRid: number): void {
    Validator.checkIfIsEmpty(aRid, 'The PaymentEvent rid is empty');
    this.setReadOnlyProperty('rid', aRid);
  }

  private setPpid(aPpid: string): void {
    Validator.checkIfIsEmpty(aPpid, 'The PaymentEvent ppid is empty');
    this.setReadOnlyProperty('ppid', aPpid);
  }

  private setData(data: PaymentData): void {
    Validator.checkIfIsEmpty(data, 'The PaymentEvent data is empty');
    this.setReadOnlyProperty('data', data);
  }
}
