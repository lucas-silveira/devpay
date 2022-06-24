import * as Nest from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import * as Tests from '@shared/testing';
import { AccountCreated } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { MysqlRepositoryAdapter } from '../mysql-repository.adapter';
import { MysqlRepositoryDecorator } from '../mysql-repository.decorator';

Tests.ioScope('MysqlRepositoryAdapter', () => {
  let connection: Connection;
  let eventPublisher: Mocks.FakeEventPublisher;
  let mysqlRepositoryAdapter: MysqlRepositoryAdapter;
  let mysqlRepositoryDecorator: MysqlRepositoryDecorator;

  beforeAll(async () => {
    connection = await createConnection();
    eventPublisher = new Mocks.FakeEventPublisher();
    mysqlRepositoryAdapter = new MysqlRepositoryAdapter();
    mysqlRepositoryDecorator = new MysqlRepositoryDecorator(
      mysqlRepositoryAdapter,
      eventPublisher,
    );
  });

  afterEach(async () => {
    await connection.query('DELETE from accounts');
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('save', () => {
    it('Should be able to save an Account aggregate', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();
      const mysqlRepositoryAdapterSpy = jest.spyOn(
        mysqlRepositoryAdapter,
        'save',
      );
      const eventPublisherSpy = jest.spyOn(eventPublisher, 'publish');

      await expect(
        mysqlRepositoryDecorator.save(account),
      ).resolves.not.toThrow();
      expect(mysqlRepositoryAdapterSpy).toBeCalledWith(account);
      expect(eventPublisherSpy).toBeCalledWith(jasmine.any(AccountCreated));
      const accountFromDB = await connection.query(
        `SELECT id from accounts WHERE id = ${account.id}`,
      );
      expect(accountFromDB).toBeTruthy();
    });

    it('Should be able to revert the transaction if an error occurs while publishing message', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();
      const mysqlRepositoryAdapterSpy = jest.spyOn(
        mysqlRepositoryAdapter,
        'save',
      );
      jest.spyOn(eventPublisher, 'publish').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(mysqlRepositoryDecorator.save(account)).rejects.toThrowError(
        Nest.BadGatewayException,
      );
      expect(mysqlRepositoryAdapterSpy).toBeCalledWith(account);
      const accountFromDB = await connection.query(
        `SELECT id from accounts WHERE id = ${account.id}`,
      );
      expect(accountFromDB).toBeFalsy();
    });
  });
});
