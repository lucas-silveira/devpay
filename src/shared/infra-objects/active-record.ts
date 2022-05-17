import { BaseEntity } from 'typeorm';

export abstract class ActiveRecord<T> extends BaseEntity {
  abstract toDomainObject(): T;
}
