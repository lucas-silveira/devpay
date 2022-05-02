export abstract class ValueObject {
  protected setReadOnlyProperty(propertyName: string, value: any): void {
    this[propertyName as any] = value;
  }
}
