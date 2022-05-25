import * as TypeORM from 'typeorm';
import { PaymentMethod } from '@shared/domain-objects';
import { ProviderType } from '@payments/domain';

@TypeORM.Entity('payment_providers')
export class PaymentProviderActiveRecord extends TypeORM.BaseEntity {
  @TypeORM.PrimaryColumn({
    type: 'varchar',
    length: 16,
  })
  public id: string;

  @TypeORM.Column({
    type: 'enum',
    enum: ProviderType,
  })
  public type: ProviderType;

  @TypeORM.Column({
    type: 'json',
  })
  public acceptedPaymentMethods: PaymentMethod[];

  @TypeORM.Column({
    length: 24,
  })
  public authToken: string;

  @TypeORM.CreateDateColumn()
  public createdAt: Date;

  @TypeORM.UpdateDateColumn()
  public updatedAt: Date;
}
