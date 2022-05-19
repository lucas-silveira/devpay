import { Validator, ValueObject } from '@shared/domain-objects';
import { RecipientType } from './recipient-type.enum';

export class Recipient extends ValueObject {
  public readonly name: string;
  public readonly type: RecipientType;
  public readonly createdAt: Date;

  constructor(name: string, type: RecipientType, createdAt: Date) {
    super();
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
    this.setReadOnlyProperty('type', aType);
  }

  private setCreatedAt(aDate: Date): void {
    Validator.checkIfIsEmpty(aDate, 'The Recipient createdAt is empty');
    this.setReadOnlyProperty('createdAt', aDate);
  }
}
