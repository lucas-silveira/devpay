import { ValueObject } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import {
  BankAccountType,
  getAcceptedBankAccountTypes,
} from './bank-account-type.enum';
import {
  BankHolderType,
  getAcceptedBankHolderTypes,
} from './bank-holder-type.enum';

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
    if (!aName)
      throw new DomainException('The BankAccount holderName is empty');
    this.setReadOnlyProperty('holderName', aName);
  }

  private setHolderType(aType: BankHolderType): void {
    if (!aType)
      throw new DomainException('The BankAccount bankHolderType is empty');

    const isTypeNotAccepted = !getAcceptedBankHolderTypes().includes(aType);
    if (isTypeNotAccepted)
      throw new DomainException(
        `The BankAccount bankHolderType is not accepted: ${aType}`,
      );

    this.setReadOnlyProperty('holderType', aType);
  }

  private setDocument(aDocument: string): void {
    if (!aDocument)
      throw new DomainException('The BankAccount document is empty');
    this.setReadOnlyProperty('document', aDocument);
  }

  private setBankCode(aCode: string): void {
    if (!aCode) throw new DomainException('The BankAccount bankCode is empty');
    this.setReadOnlyProperty('bankCode', aCode);
  }

  private setAccountType(aType: BankAccountType): void {
    if (!aType)
      throw new DomainException('The BankAccount accountType is empty');

    const isTypeNotAccepted = !getAcceptedBankAccountTypes().includes(aType);
    if (isTypeNotAccepted)
      throw new DomainException(
        `The BankAccount accountType is not accepted: ${aType}`,
      );

    this.setReadOnlyProperty('accountType', aType);
  }

  private setAccountNumber(aNumber: string): void {
    if (!aNumber)
      throw new DomainException('The BankAccount accountNumber is empty');
    this.setReadOnlyProperty('accountNumber', aNumber);
  }

  private setAccountCheckDigit(aDigit: string): void {
    if (!aDigit)
      throw new DomainException('The BankAccount accountCheckDigit is empty');
    if (aDigit.length > 1)
      throw new DomainException('The BankAccount accountCheckDigit is invalid');

    this.setReadOnlyProperty('accountCheckDigit', aDigit);
  }
}
