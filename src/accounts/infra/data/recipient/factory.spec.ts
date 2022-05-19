import * as Nest from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { DomainException } from '@shared/infra-objects';
import * as SharedTests from '@shared/tests';
import { Recipient, BankAccount } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { RecipientFactory } from './factory';
import { RecipientActiveRecord } from './recipient.ar';

SharedTests.databaseTest('Factory', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should be able to remake a Recipient', () => {
    const recipient = Mocks.RecipientDomainObjectBuilder().build();
    const recipientAR = RecipientActiveRecord.create(recipient);
    const newRecipient = RecipientFactory.toDomainObject(recipientAR);

    expect(newRecipient).toBeInstanceOf(Recipient);
    expect(newRecipient.bankAccount).toBeInstanceOf(BankAccount);
    expect(newRecipient.createdAt).toBeInstanceOf(Date);
    expect(newRecipient).toEqual(recipient);
  });

  it('Should be able to throw a DomainException if constructor throw it', async () => {
    const recipient = Mocks.RecipientDomainObjectBuilder()
      .withFields({ type: 'X' as any })
      .build();
    const recipientAR = RecipientActiveRecord.create(recipient);

    await expect(
      RecipientFactory.toDomainObject(recipientAR),
    ).rejects.toThrowError(DomainException);
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', async () => {
    await expect(
      RecipientFactory.toDomainObject(undefined),
    ).rejects.toThrowError(Nest.InternalServerErrorException);
  });
});
