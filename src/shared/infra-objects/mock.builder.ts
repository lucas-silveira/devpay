export class MockBuilder<T extends Record<string, unknown>> {
  private mock: T;

  constructor(mock: T) {
    this.mock = mock;
  }

  withFields(fields: Partial<Plain<T>> = {}): MockBuilder<T> {
    Object.entries(fields).forEach(([field, value]) => {
      this.mock[field as keyof T] = value as T[keyof T];
    });
    return this;
  }

  withoutFields(...fields: [keyof T]): MockBuilder<T> {
    Object.keys(this.mock).forEach((key) => {
      if (fields.includes(key)) delete this.mock[key];
    });
    return this;
  }

  public build(): T {
    return this.mock;
  }
}
