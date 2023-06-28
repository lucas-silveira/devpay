import * as Nest from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import * as Tests from '@shared/testing';
import { AccountsModule } from '@accounts/accounts.module';
import {
  AccountCreated,
  IAccountsRepository,
  IEventPublisher,
} from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';

Tests.integrationScope('MysqlRepositoryAdapter', () => {
  let moduleRef: TestingModule;
  let connection: DataSource;
  let eventPublisher: IEventPublisher;
  let mysqlRepositoryAdapter: IAccountsRepository;
  let mysqlRepositoryDecorator: IAccountsRepository;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AppModule.imports[0],
        AppModule.imports[1],
        AccountsModule.imports[0],
      ],
      providers: [
        AccountsModule.providers[3],
        AccountsModule.providers[4],
        {
          provide: 'EventPublisher',
          useClass: Mocks.FakeEventPublisher,
        },
      ],
    }).compile();

    connection = moduleRef.get<DataSource>(getConnectionToken());
    eventPublisher = moduleRef.get<IEventPublisher>('EventPublisher');
    mysqlRepositoryAdapter = moduleRef.get<IAccountsRepository>(
      'AccountsRepositoryAdapter',
    );
    mysqlRepositoryDecorator =
      moduleRef.get<IAccountsRepository>('AccountsRepository');
  });

  afterEach(async () => {
    await connection.query('DELETE from accounts');
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('save', () => {
    it('Should be able to save an Account aggregate and publish a DomainEvent', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();
      const eventPublisherSpy = jest.spyOn(eventPublisher, 'publish');

      await expect(
        mysqlRepositoryDecorator.save(account),
      ).resolves.not.toThrow();
      expect(eventPublisherSpy).toBeCalledWith(jasmine.any(AccountCreated));
      const accountFromDB = await connection.query(
        `SELECT id from accounts WHERE id = ${account.id}`,
      );
      expect(accountFromDB[0]).toBeTruthy();
    });

    it('Should be able to revert the transaction if an error occurs while publishing message', async () => {
      const account = Mocks.AccountDomainObjectBuilder()
        .withoutFields('id')
        .build();
      jest.spyOn(eventPublisher, 'publish').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(mysqlRepositoryDecorator.save(account)).rejects.toThrowError(
        Nest.BadGatewayException,
      );
      const accountFromDB = await connection.query(
        `SELECT id from accounts WHERE id = ${account.id}`,
      );
      expect(accountFromDB[0]).toBeFalsy();
    });
  });

  describe('findOneById', () => {
    it('Should be able to call decorated Repository method', async () => {
      const anId = 1;
      const mysqlRepositoryAdapterSpy = jest.spyOn(
        mysqlRepositoryAdapter,
        'findOneById',
      );

      await expect(
        mysqlRepositoryDecorator.findOneById(anId),
      ).resolves.not.toThrow();
      expect(mysqlRepositoryAdapterSpy).toBeCalledWith(anId);
    });
  });

  describe('isEmailInUse', () => {
    it('Should be able to call decorated Repository method', async () => {
      const anEmail = 'an-email@host.com';
      const mysqlRepositoryAdapterSpy = jest.spyOn(
        mysqlRepositoryAdapter,
        'isEmailInUse',
      );

      await expect(
        mysqlRepositoryDecorator.isEmailInUse(anEmail),
      ).resolves.not.toThrow();
      expect(mysqlRepositoryAdapterSpy).toBeCalledWith(anEmail);
    });
  });
});
