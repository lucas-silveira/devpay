import { AggregateRoot } from '@shared/domain-objects';

export class Recipient extends AggregateRoot {
  public firstName: string;
  public lastName: string;
  public email: string;
  public document: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    document: string,
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.document = document;
  }
}
