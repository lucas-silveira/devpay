import { AggregateRoot, Validator } from '@shared/domain-objects';
import { RecipientType } from './recipient-type.enum';

export class Recipient extends AggregateRoot {
  public id: number;
  public name: string;
  public type: RecipientType;
  public createdAt: Date;

  constructor(id: number, name: string, type: RecipientType, createdAt: Date) {
    super(id);
    this.name = name;
    this.setType(type);
    this.setCreatedAt(createdAt);
  }

  private setType(aType: RecipientType): void {
    Validator.checkIfIsEmpty(aType, 'The Recipient type is empty');
    Validator.checkIfIsAValidEnum(
      RecipientType,
      aType,
      `The Recipient type is not accepted: ${aType}`,
    );
    this.type = aType;
  }

  private setCreatedAt(aDate: Date): void {
    Validator.checkIfIsEmpty(aDate, 'The Recipient createdAt is empty');
    this.createdAt = aDate;
  }
}
