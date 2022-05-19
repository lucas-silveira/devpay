import * as TypeORM from 'typeorm';
import { AccountType, BankAccount } from '@accounts/domain';

@TypeORM.Entity('accounts')
export class AccountActiveRecord extends TypeORM.BaseEntity {
  @TypeORM.PrimaryGeneratedColumn()
  public id: number;

  @TypeORM.Column({
    length: 16,
  })
  public firstName: string;

  @TypeORM.Column({
    length: 16,
  })
  public lastName: string;

  @TypeORM.Index({ unique: true })
  @TypeORM.Column({
    length: 32,
  })
  public email: string;

  @TypeORM.Column({
    length: 24,
  })
  public document: string;

  @TypeORM.Column({
    type: 'enum',
    enum: AccountType,
  })
  public type: AccountType;

  @TypeORM.Index({ unique: true })
  @TypeORM.Column({
    length: 16,
  })
  public secretKey: string;

  @TypeORM.Column()
  public policyId: string;

  @TypeORM.Column({
    type: 'json',
  })
  public bankAccount: BankAccount;

  @TypeORM.CreateDateColumn()
  public createdAt: Date;

  @TypeORM.UpdateDateColumn()
  public updatedAt: Date;
}
