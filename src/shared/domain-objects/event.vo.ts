import * as Validator from './validator';
import { ValueObject } from './value-object';

export class DomainEvent extends ValueObject {
  public readonly key: string;

  constructor(key: string) {
    super();
    this.setKey(key);
  }

  protected setKey(aKey: string): void {
    Validator.checkIfIsNotEmpty(
      aKey,
      `The ${this.constructor.name} key is empty`,
    );
    this.setReadOnlyProperty('key', aKey);
  }
}
