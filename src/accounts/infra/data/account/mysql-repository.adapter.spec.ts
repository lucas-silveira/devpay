import { Connection, createConnection } from 'typeorm';
import * as SharedTests from '@shared/tests';
import { Account } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { MysqlRepositoryAdapter } from './mysql-repository.adapter';

SharedTests.databaseTest('MysqlRepositoryAdapter', () => {
  let connection: Connection;
  let mysqlRepositoryAdapter: MysqlRepositoryAdapter;

  beforeAll(async () => {
    connection = await createConnection();
    mysqlRepositoryAdapter = new MysqlRepositoryAdapter();
  });

  beforeEach(async () => {
    await connection.query('DELETE from accounts');
  });

  afterAll(async () => {
    await connection.query('DELETE from accounts');
    await connection.close();
  });

  describe('save', () => {
    it('Should be able to save a Account aggregate', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();

      expect(account.id).toBeFalsy();
      await expect(
        mysqlRepositoryAdapter.save(account),
      ).resolves.not.toThrow();
      expect(account.id).toBeTruthy();
    });

    it('Should be able to save a Account aggregate that`s already exists', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();

      await mysqlRepositoryAdapter.save(account);
      await account.giveNewSecretKey();
      const lastSecretKey = account.secretKey;
      await mysqlRepositoryAdapter.save(account);

      await expect(
        mysqlRepositoryAdapter.findOneById(account.id),
      ).resolves.toEqual(expect.objectContaining({ secretKey: lastSecretKey }));
    });
  });

  describe('findOneById', () => {
    it('Should be able to retrieve a Account aggregate by id', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();

      await mysqlRepositoryAdapter.save(account);

      const expectedAccount = { ...account, createdAt: jasmine.any(Date) };
      const accountFetched = await mysqlRepositoryAdapter.findOneById(
        account.id,
      );

      expect(accountFetched).toBeInstanceOf(Account);
      expect(accountFetched).toEqual(expectedAccount);
    });
  });

  describe('isEmailInUse', () => {
    it('Should be able to get true if an email is already in use', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();
      await mysqlRepositoryAdapter.save(account);

      await expect(
        mysqlRepositoryAdapter.isEmailInUse(account.email),
      ).resolves.toBe(true);
    });

    it('Should be able to get false if an email is not in use', async () => {
      await expect(
        mysqlRepositoryAdapter.isEmailInUse('john2@snow.com'),
      ).resolves.toBe(false);
    });
  });
});
