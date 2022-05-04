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
  public createdAt: Date;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string,
    type: RecipientType,
    createdAt: Date = new Date(),
  ) {
    super(id);
    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.setEmail(email);
    this.setDocument(document);
    this.setType(type);
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
}
