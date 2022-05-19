import { Connection, createConnection } from 'typeorm';
import * as SharedTests from '@shared/tests';
import { Recipient } from '@domain/recipient';
import * as Mocks from '@infra/mocks';
import { MysqlRepositoryAdapter } from './mysql-repository.adapter';

SharedTests.databaseTest('MysqlRepositoryAdapter', () => {
  let connection: Connection;
  let mysqlRepositoryAdapter: MysqlRepositoryAdapter;

  beforeAll(async () => {
    connection = await createConnection();
    mysqlRepositoryAdapter = new MysqlRepositoryAdapter();
  });

  beforeEach(async () => {
    await connection.query('DELETE from recipients');
  });

  afterAll(async () => {
    await connection.query('DELETE from recipients');
    await connection.close();
  });

  describe('save', () => {
    it('Should be able to save a Recipient aggregate', async () => {
      const recipient = Mocks.RecipientDomainObjectBuilder()
        .withoutFields('id')
        .build();

      expect(recipient.id).toBeFalsy();
      await expect(
        mysqlRepositoryAdapter.save(recipient),
      ).resolves.not.toThrow();
      expect(recipient.id).toBeTruthy();
    });

    it('Should be able to save a Recipient aggregate that`s already exists', async () => {
      const recipient = Mocks.RecipientDomainObjectBuilder()
        .withoutFields('id')
        .build();

      await mysqlRepositoryAdapter.save(recipient);
      await recipient.giveNewSecretKey();
      const lastSecretKey = recipient.secretKey;
      await mysqlRepositoryAdapter.save(recipient);

      await expect(
        mysqlRepositoryAdapter.findOneById(recipient.id),
      ).resolves.toEqual(expect.objectContaining({ secretKey: lastSecretKey }));
    });
  });

  describe('findOneById', () => {
    it('Should be able to retrieve a Recipient aggregate by id', async () => {
      const recipient = Mocks.RecipientDomainObjectBuilder()
        .withoutFields('id')
        .build();

      await mysqlRepositoryAdapter.save(recipient);

      const expectedRecipient = { ...recipient, createdAt: jasmine.any(Date) };
      const recipientFetched = await mysqlRepositoryAdapter.findOneById(
        recipient.id,
      );

      expect(recipientFetched).toBeInstanceOf(Recipient);
      expect(recipientFetched).toEqual(expectedRecipient);
    });
  });

  describe('isEmailInUse', () => {
    it('Should be able to get true if an email is already in use', async () => {
      const recipient = Mocks.RecipientDomainObjectBuilder()
        .withoutFields('id')
        .build();
      await mysqlRepositoryAdapter.save(recipient);

      await expect(
        mysqlRepositoryAdapter.isEmailInUse(recipient.email),
      ).resolves.toBe(true);
    });

    it('Should be able to get false if an email is not in use', async () => {
      await expect(
        mysqlRepositoryAdapter.isEmailInUse('john2@snow.com'),
      ).resolves.toBe(false);
    });
  });
});
