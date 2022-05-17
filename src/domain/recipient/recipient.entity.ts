import { AggregateRoot, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
import { BankAccount } from './bank-account.vo';
import { RecipientType } from './recipient-type.enum';

export class Recipient extends AggregateRoot {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public document: string;
  public type: RecipientType;
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
    type: RecipientType,
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
    Validator.checkIfIsEmpty(aName, 'The Recipient firstName is empty');
    this.firstName = aName;
  }

  private setLastName(aName: string): void {
    Validator.checkIfIsEmpty(aName, 'The Recipient lastName is empty');
    this.lastName = aName;
  }

  private setEmail(anEmail: string): void {
    Validator.checkIfIsEmpty(anEmail, 'The Recipient email is empty');
    this.email = anEmail;
  }

  private setDocument(aDocument: string): void {
    Validator.checkIfIsEmpty(aDocument, 'The Recipient document is empty');
    this.document = aDocument;
  }

  private setType(aType: RecipientType): void {
    Validator.checkIfIsEmpty(aType, 'The Recipient type is empty');
    Validator.checkIfIsAValidEnum(
      RecipientType,
      aType,
      `The Recipient type is not accepted: ${aType}`,
    );
    this.type = aType;
  }

  private setBankAccount(aBankAccount: BankAccount): void {
    Validator.checkIfIsEmpty(
      aBankAccount,
      'The Recipient bankAccount is empty',
    );
    this.bankAccount = aBankAccount;
  }

  public async giveNewSecretKey(): Promise<void> {
    this.secretKey = await Utils.Hash.generateRandomKey();
  }
}
