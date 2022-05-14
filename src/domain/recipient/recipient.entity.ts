import { AggregateRoot, Validator } from '@shared/domain-objects';
import * as Utils from '@shared/utils';
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

  public async giveNewSecretKey(): Promise<void> {
    this.secretKey = await Utils.Hash.generateRandomString();
  }
}
