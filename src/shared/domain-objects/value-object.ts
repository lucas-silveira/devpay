export abstract class ValueObject {
  protected setReadOnlyProperty(propertyName: keyof this, value: any): void {
    this[propertyName] = value;
  }
}
