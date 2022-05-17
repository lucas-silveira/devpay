import * as TypeORM from 'typeorm';
import { ActiveRecord } from '@shared/infra-objects';
import { Recipient, RecipientType, BankAccount } from '@domain/recipient';

@TypeORM.Entity('recipients')
export class RecipientActiveRecord extends ActiveRecord<Recipient> {
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
    enum: RecipientType,
  })
  public type: RecipientType;

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

  public toDomainObject(): Recipient {
    return new Recipient(
      this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.document,
      this.type,
      this.secretKey,
      this.policyId,
      this.remakeBankAccount(),
      this.createdAt,
    );
  }

  private remakeBankAccount(): BankAccount {
    return new BankAccount(
      this.bankAccount.holderName,
      this.bankAccount.holderType,
      this.bankAccount.document,
      this.bankAccount.bankCode,
      this.bankAccount.accountType,
      this.bankAccount.accountNumber,
      this.bankAccount.accountCheckDigit,
    );
  }
}
