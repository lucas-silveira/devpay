import { ValueObject } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import {
  BankHolderType,
  getAcceptedBankHolderTypes,
} from './bank-holder-type.enum';

export class BankAccount extends ValueObject {
  public readonly holderName: string;
  public readonly holderType: BankHolderType;
  public readonly document: string;
  public readonly bankCode: string;
  public readonly accountNumber: string;
  public readonly accountCheckDigit: string;

  constructor(
    holderName: string,
    holderType: BankHolderType,
    document: string,
    bankCode: string,
    accountNumber: string,
    accountCheckDigit: string,
  ) {
    super();
    this.setHolderName(holderName);
    this.setBankHolderType(holderType);
    this.setDocument(document);
    this.setBankCode(bankCode);
    this.setAccountNumber(accountNumber);
    this.setAccountCheckDigit(accountCheckDigit);
  }

  private setHolderName(aName: string): void {
    if (!aName)
      throw new DomainException('The bank account holderName is empty');
    this.setReadOnlyProperty('holderName', aName);
  }

  private setBankHolderType(aType: BankHolderType): void {
    if (!aType)
      throw new DomainException('The recipient bankHolderType is empty');

    const isTypeNotAccepted = !getAcceptedBankHolderTypes().includes(aType);
    if (isTypeNotAccepted)
      throw new DomainException(
        `The incoming bankHolderType is not accepted: ${aType}`,
      );

    this.setReadOnlyProperty('holderType', aType);
  }

  private setDocument(aDocument: string): void {
    if (!aDocument)
      throw new DomainException('The bank account document is empty');
    this.setReadOnlyProperty('document', aDocument);
  }

  private setBankCode(aCode: string): void {
    if (!aCode) throw new DomainException('The bank account bankCode is empty');
    this.setReadOnlyProperty('bankCode', aCode);
  }

  private setAccountNumber(aNumber: string): void {
    if (!aNumber)
      throw new DomainException('The bank account accountNumber is empty');
    this.setReadOnlyProperty('accountNumber', aNumber);
  }

  private setAccountCheckDigit(aDigit: string): void {
    if (!aDigit)
      throw new DomainException('The bank account accountCheckDigit is empty');
    if (aDigit.length > 1)
      throw new DomainException(
        'The bank account accountCheckDigit is invalid',
      );

    this.setReadOnlyProperty('accountCheckDigit', aDigit);
  }
}
