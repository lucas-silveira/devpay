import * as Validator from './validator';
import { ValueObject } from './value-object';

export class Cents extends ValueObject {
  public readonly value: number;

  constructor(value: number) {
    super();
    this.setValue(value);
  }

  private setValue(aValue: number): void {
    Validator.checkIfIsNotEmpty(aValue, 'The Cents value is empty');
    Validator.checkIfIsInteger(aValue, 'The Cents value is not integer');
    Validator.checkIfIsNotLessThan(
      aValue,
      0,
      'The Cents value is lower than 0',
    );
    this.setReadOnlyProperty('value', aValue);
  }

  public plus(aCents: Cents): Cents {
    return new Cents(this.value + aCents.value);
  }

  public discount(aCents: Cents): Cents {
    return new Cents(this.value - aCents.value);
  }
}
