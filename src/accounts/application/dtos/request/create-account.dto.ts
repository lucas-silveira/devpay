import * as Transformer from 'class-transformer';
import * as Validator from 'class-validator';
import { AccountType, BankHolderType, BankAccountType } from '@accounts/domain';

export class CreateBankAccountDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(32)
  public readonly holderName: string;

  @Validator.IsNotEmpty()
  @Validator.IsEnum(BankHolderType)
  public readonly holderType: BankHolderType;

  @Validator.IsNotEmpty()
  @Validator.Matches(/^[\d+\.-]+$/)
  @Validator.MaxLength(24)
  public readonly document: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(4)
  public readonly bankCode: string;

  @Validator.IsNotEmpty()
  @Validator.IsEnum(BankAccountType)
  public readonly accountType: BankAccountType;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(32)
  public readonly accountNumber: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(2)
  public readonly accountCheckDigit: string;
}

export class CreateAccountDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(16)
  public readonly firstName: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(16)
  public readonly lastName: string;

  @Validator.IsNotEmpty()
  @Validator.IsEmail()
  @Validator.MaxLength(32)
  public readonly email: string;

  @Validator.IsNotEmpty()
  @Validator.Matches(/^[\d+\.-]+$/)
  @Validator.MaxLength(24)
  public readonly document: string;

  @Validator.IsNotEmpty()
  @Validator.IsEnum(AccountType)
  public readonly type: AccountType;

  @Validator.IsNotEmptyObject()
  @Validator.ValidateNested()
  @Transformer.Type(() => CreateBankAccountDto)
  public readonly bankAccount: CreateBankAccountDto;
}
