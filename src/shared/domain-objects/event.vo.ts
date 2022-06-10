import * as Validator from './validator';
import { ValueObject } from './value-object';

export class DomainEvent extends ValueObject {
  public readonly name: string;

  constructor(name: string) {
    super();
    this.setName(name);
  }

  protected setName(aName: string): void {
    Validator.checkIfIsNotEmpty(
      aName,
      `The ${this.constructor.name} name is empty`,
    );
    this.setReadOnlyProperty('name', aName);
  }
}
