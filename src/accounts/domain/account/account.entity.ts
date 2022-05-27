import { AggregateRoot, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { AccountType } from './account-type.enum';
import { BankAccount } from './bank-account.vo';

export class Account extends AggregateRoot {
  public override id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public document: string;
  public type: AccountType;
  public secretKey: string;
  public policyId: string;
  public bankAccount: BankAccount;
  public createdAt: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string,
    type: AccountType,
    secretKey: string,
    policyId = 'default',
    bankAccount: BankAccount,
    createdAt: Date = new Date(),
  ) {
    super(id);
    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.setEmail(email);
    this.setDocument(document);
    this.setType(type);
    this.secretKey = secretKey;
    this.policyId = policyId;
    this.setBankAccount(bankAccount);
    this.createdAt = createdAt;
  }

  private setFirstName(aName: string): void {
    Validator.checkIfIsNotEmpty(aName, 'The Account firstName is empty');
    this.firstName = aName;
  }

  private setLastName(aName: string): void {
    Validator.checkIfIsNotEmpty(aName, 'The Account lastName is empty');
    this.lastName = aName;
  }

  private setEmail(anEmail: string): void {
    Validator.checkIfIsNotEmpty(anEmail, 'The Account email is empty');
    this.email = anEmail;
  }

  private setDocument(aDocument: string): void {
    Validator.checkIfIsNotEmpty(aDocument, 'The Account document is empty');
    this.document = aDocument;
  }

  private setType(aType: AccountType): void {
    Validator.checkIfIsNotEmpty(aType, 'The Account type is empty');
    Validator.checkIfIsValidEnum(
      AccountType,
      aType,
      `The Account type is not accepted: ${aType}`,
    );
    this.type = aType;
  }

  private setBankAccount(aBankAccount: BankAccount): void {
    Validator.checkIfIsNotEmpty(
      aBankAccount,
      'The Account bankAccount is empty',
    );
    this.bankAccount = aBankAccount;
  }

  public async giveNewSecretKey(): Promise<void> {
    this.secretKey = await Utils.Hash.generateRandomKey();
  }
}
