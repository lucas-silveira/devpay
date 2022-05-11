export abstract class Entity {
  public id: number | string;

  constructor(id: number | string) {
    this.id = id;
  }

  public isEqualTo(anEntity: Record<string, any>): boolean {
    return this.id === anEntity.id;
  }
}
