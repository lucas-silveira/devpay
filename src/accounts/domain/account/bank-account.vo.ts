import { ValueObject, Validator } from '@shared/domain-objects';
import { BankAccountType } from './bank-account-type.enum';
import { BankHolderType } from './bank-holder-type.enum';

export class BankAccount extends ValueObject {
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
    super();
    this.setHolderName(holderName);
    this.setHolderType(holderType);
    this.setDocument(document);
    this.setBankCode(bankCode);
    this.setAccountType(accountType);
    this.setAccountNumber(accountNumber);
    this.setAccountCheckDigit(accountCheckDigit);
  }

  private setHolderName(aName: string): void {
    Validator.checkIfIsEmpty(aName, 'The BankAccount holderName is empty');
    this.setReadOnlyProperty('holderName', aName);
  }

  private setHolderType(aType: BankHolderType): void {
    Validator.checkIfIsEmpty(aType, 'The BankAccount holderType is empty');
    Validator.checkIfIsInvalidEnum(
      BankHolderType,
      aType,
      `The BankAccount holderType is not accepted: ${aType}`,
    );
    this.setReadOnlyProperty('holderType', aType);
  }

  private setDocument(aDocument: string): void {
    Validator.checkIfIsEmpty(aDocument, 'The BankAccount document is empty');
    this.setReadOnlyProperty('document', aDocument);
  }

  private setBankCode(aCode: string): void {
    Validator.checkIfIsEmpty(aCode, 'The BankAccount bankCode is empty');
    this.setReadOnlyProperty('bankCode', aCode);
  }

  private setAccountType(aType: BankAccountType): void {
    Validator.checkIfIsEmpty(aType, 'The BankAccount accountType is empty');
    Validator.checkIfIsInvalidEnum(
      BankAccountType,
      aType,
      `The BankAccount accountType is not accepted: ${aType}`,
    );
    this.setReadOnlyProperty('accountType', aType);
  }

  private setAccountNumber(aNumber: string): void {
    Validator.checkIfIsEmpty(aNumber, 'The BankAccount accountNumber is empty');
    this.setReadOnlyProperty('accountNumber', aNumber);
  }

  private setAccountCheckDigit(aDigit: string): void {
    Validator.checkIfIsEmpty(
      aDigit,
      'The BankAccount accountCheckDigit is empty',
    );
    Validator.checkIfIsGreaterThanMax(
      aDigit,
      1,
      'The BankAccount accountCheckDigit is invalid',
    );
    this.setReadOnlyProperty('accountCheckDigit', aDigit);
  }
}
