import { ValueObject } from './value-object';

export abstract class DomainEvent extends ValueObject {
  public readonly name: string;
}
