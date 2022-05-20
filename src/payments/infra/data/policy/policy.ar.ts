import * as TypeORM from 'typeorm';
import { ProviderLiable, Requirements } from '@payments/domain';

@TypeORM.Entity('policies')
export class PolicyActiveRecord extends TypeORM.BaseEntity {
  @TypeORM.PrimaryColumn({
    type: 'varchar',
    length: 16,
  })
  public id: string;

  @TypeORM.Column({
    type: 'double',
  })
  public fee: number;

  @TypeORM.Column({
    type: 'json',
  })
  public requirements: Requirements;

  @TypeORM.Column({
    type: 'json',
  })
  public providerLiables: ProviderLiable[];

  @TypeORM.CreateDateColumn()
  public createdAt: Date;

  @TypeORM.UpdateDateColumn()
  public updatedAt: Date;
}
