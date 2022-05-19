import { BankAccountType, BankHolderType } from '@domain/recipient';

export class BankAccountDto {
  public readonly holderName: string;
  public readonly holderType: BankHolderType;
  public readonly document: string;
  public readonly bankCode: string;
  public readonly accountType: BankAccountType;
  public readonly accountNumber: string;
  public readonly accountCheckDigit: string;

  constructor(
    holderName: string,
    holderType: BankHolderType,
    document: string,
    bankCode: string,
    accountType: BankAccountType,
    accountNumber: string,
    accountCheckDigit: string,
  ) {
    this.holderName = holderName;
    this.holderType = holderType;
    this.document = document;
    this.bankCode = bankCode;
    this.accountType = accountType;
    this.accountNumber = accountNumber;
    this.accountCheckDigit = accountCheckDigit;
  }
}
