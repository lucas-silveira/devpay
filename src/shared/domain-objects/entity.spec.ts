import * as Tests from '@shared/tests';
import { Entity } from './entity';

Tests.unitScope('ValueObject', () => {
  class TestObj extends Entity {
    constructor(public id: number, public x: unknown, public y: unknown) {
      super(id);
    }
  }

  it('Should be able to get true if two objects are equals', () => {
    const obj1 = new TestObj(1, 1, 2);
    const obj2 = new TestObj(1, 2, 1);
    const obj3 = new TestObj(1, { z: 1 }, 1);
    const obj4 = new TestObj(1, { z: 2 }, 2);

    expect(obj1.isEqualTo(obj1)).toBe(true);
    expect(obj1.isEqualTo(obj2)).toBe(true);
    expect(obj3.isEqualTo(obj4)).toBe(true);
  });

  it('Should be able to get false if two objects are not equals', () => {
    const obj1 = new TestObj(1, 1, 2);
    const obj2 = new TestObj(2, 1, 2);
    const obj3 = new TestObj(1, 1, { z: 2 });
    const obj4 = new TestObj(2, 1, { z: 2 });

    expect(obj1.isEqualTo({})).toBe(false);
    expect(obj1.isEqualTo(obj2)).toBe(false);
    expect(obj3.isEqualTo(obj4)).toBe(false);
  });
});
