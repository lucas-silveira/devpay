import { Connection, createConnection } from 'typeorm';
import * as SharedTests from '@shared/tests';
import { Recipient, BankAccount } from '@domain/recipient';
import * as Mocks from '@infra/mocks';
import { RecipientActiveRecord } from './recipient.ar';

SharedTests.describeif('RecipientActiveRecord', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });
  it('Should be able to deserialize', () => {
    const recipient = Mocks.RecipientDomainObjectBuilder().build();
    const recipientAR = RecipientActiveRecord.create(recipient);
    const recipientFetched = recipientAR.toDomainObject();

    expect(recipientFetched).toBeInstanceOf(Recipient);
    expect(recipientFetched.bankAccount).toBeInstanceOf(BankAccount);
    expect(recipientFetched.createdAt).toBeInstanceOf(Date);
    expect(recipientFetched).toEqual(recipient);
  });
});
