import { AccountType } from '@accounts/domain';
import { BankAccountDto } from './bank-account.dto';

export class AccountDto {
  public readonly id: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly document: string;
  public readonly type: AccountType;
  public readonly level: string;
  public readonly bankAccount: BankAccountDto;
  public readonly createdAt: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string,
    type: AccountType,
    level: string,
    bankAccount: BankAccountDto,
    createdAt: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.document = document;
    this.type = type;
    this.level = level;
    this.bankAccount = bankAccount;
    this.createdAt = createdAt;
  }
}
