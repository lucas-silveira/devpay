import { BaseEntity } from 'typeorm';

export abstract class ActiveRecord extends BaseEntity {
  abstract deserialize(): any;
}
