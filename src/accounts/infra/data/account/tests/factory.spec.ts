import * as Nest from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import { Account, BankAccount } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { AccountActiveRecord } from '../account.ar';
import { AccountFactory } from '../factory';

Tests.databaseScope('Factory', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should be able to remake a Account', () => {
    const account = Mocks.AccountDomainObjectBuilder().build();
    const accountAR = AccountActiveRecord.create(account);
    const newAccount = AccountFactory.toDomainObject(accountAR);

    expect(newAccount).toBeInstanceOf(Account);
    expect(newAccount.bankAccount).toBeInstanceOf(BankAccount);
    expect(newAccount.createdAt).toBeInstanceOf(Date);
    expect(newAccount).toEqual(account);
  });

  it('Should be able to throw a DomainException if constructor throw it', async () => {
    const account = Mocks.AccountDomainObjectBuilder()
      .withFields({ type: 'X' as any })
      .build();
    const accountAR = AccountActiveRecord.create(account);

    expect(() => AccountFactory.toDomainObject(accountAR)).toThrowError(
      DomainException,
    );
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', () => {
    expect(() => AccountFactory.toDomainObject(undefined)).toThrowError(
      Nest.InternalServerErrorException,
    );
  });
});
