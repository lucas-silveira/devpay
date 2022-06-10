import { DomainEvent, Validator } from '@shared/domain-objects';
import { AccountEventKey } from '../account-event-key.enum';

export class AccountCreated extends DomainEvent {
  public override readonly key: AccountEventKey;
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly document: string;

  constructor(id: number, name: string, email: string, document: string) {
    super(AccountEventKey.AccountCreated);
    this.setId(id);
    this.setName(name);
    this.setEmail(email);
    this.setDocument(document);
  }

  private setId(anId: number): void {
    Validator.checkIfIsNotEmpty(anId, 'The AccountCreated id is empty');
    this.setReadOnlyProperty('id', anId);
  }

  private setName(aName: string): void {
    Validator.checkIfIsNotEmpty(aName, 'The AccountCreated name is empty');
    this.setReadOnlyProperty('name', aName);
  }

  private setEmail(anEmail: string): void {
    Validator.checkIfIsNotEmpty(anEmail, 'The AccountCreated email is empty');
    this.setReadOnlyProperty('email', anEmail);
  }

  private setDocument(aDocument: string): void {
    Validator.checkIfIsNotEmpty(
      aDocument,
      'The AccountCreated document is empty',
    );
    this.setReadOnlyProperty('document', aDocument);
  }
}
