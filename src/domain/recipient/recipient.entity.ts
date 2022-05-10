import { AggregateRoot } from '@shared/domain-objects';
import { DomainException } from '@shared/infra-objects';
import {
  getAcceptedRecipientTypes,
  RecipientType,
} from './recipient-type.enum';

export class Recipient extends AggregateRoot {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public document: string;
  public type: RecipientType;
  private secretKey: string;
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
    this.setSecretKey(secretKey);
    this.policyId = policyId;
    this.createdAt = createdAt;
  }

  private setFirstName(aName: string): void {
    if (!aName) throw new DomainException('The Recipient firstName is empty');
    this.firstName = aName;
  }

  private setLastName(aName: string): void {
    if (!aName) throw new DomainException('The Recipient lastName is empty');
    this.lastName = aName;
  }

  private setEmail(anEmail: string): void {
    if (!anEmail) throw new DomainException('The Recipient email is empty');
    this.email = anEmail;
  }

  private setDocument(aDocument: string): void {
    if (!aDocument)
      throw new DomainException('The Recipient document is empty');
    this.document = aDocument;
  }

  private setType(aType: RecipientType): void {
    if (!aType) throw new DomainException('The Recipient type is empty');

    const isTypeNotAccepted = !getAcceptedRecipientTypes().includes(aType);
    if (isTypeNotAccepted)
      throw new DomainException(`The Recipient type is not accepted: ${aType}`);

    this.type = aType;
  }

  private setSecretKey(aKey: string): void {
    if (!aKey) throw new DomainException('The Recipient secretKey is empty');
    this.secretKey = aKey;
  }
}
