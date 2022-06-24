import * as Nest from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { makeConfig } from 'src/config';
import { Connection, createConnection } from 'typeorm';
import * as Tests from '@shared/testing';
import { AccountCreated } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { MysqlRepositoryAdapter } from '../mysql-repository.adapter';
import { MysqlRepositoryDecorator } from '../mysql-repository.decorator';

Tests.databaseScope('MysqlRepositoryAdapter', () => {
  let connection: Connection;
  let amqpConn: AmqpConnection;
  let mysqlRepositoryAdapter: MysqlRepositoryAdapter;
  let mysqlRepositoryDecorator: MysqlRepositoryDecorator;

  beforeAll(async () => {
    connection = await createConnection();
    amqpConn = Tests.amqpConnectionMock as any;
    mysqlRepositoryAdapter = new MysqlRepositoryAdapter();
    mysqlRepositoryDecorator = new MysqlRepositoryDecorator(
      mysqlRepositoryAdapter,
      amqpConn,
      new ConfigService(makeConfig()),
    );
  });

  afterEach(async () => {
    await connection.query('DELETE from accounts');
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('save', () => {
    it('Should be able to save a Account aggregate', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();
      const mysqlRepositoryAdapterSpy = jest.spyOn(
        mysqlRepositoryAdapter,
        'save',
      );
      const amqpConnSpy = jest.spyOn(amqpConn, 'publish');

      await expect(
        mysqlRepositoryDecorator.save(account),
      ).resolves.not.toThrow();
      expect(mysqlRepositoryAdapterSpy).toBeCalledWith(account);
      expect(amqpConnSpy).toBeCalledWith(
        'devpay.topic',
        'account.created',
        jasmine.any(AccountCreated),
        { persistent: true },
      );
      const accountFromDB = await connection.query(
        `SELECT id from accounts WHERE id = ${account.id}`,
      );
      expect(accountFromDB).toBeTruthy();
    });

    it('Should be able to rollback Account if an error occurs while publishing message', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();
      const mysqlRepositoryAdapterSpy = jest.spyOn(
        mysqlRepositoryAdapter,
        'save',
      );
      jest.spyOn(amqpConn, 'publish').mockImplementationOnce(() => {
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
