import { Connection, createConnection } from 'typeorm';
import * as Tests from '@shared/testing';
import { PaymentProvider } from '@payments/domain';
import * as Mocks from '@payments/infra/mocks';
import { MysqlRepositoryAdapter } from '../mysql-repository.adapter';

Tests.ioScope('MysqlRepositoryAdapter', () => {
  let connection: Connection;
  let mysqlRepositoryAdapter: MysqlRepositoryAdapter;

  beforeAll(async () => {
    connection = await createConnection();
    mysqlRepositoryAdapter = new MysqlRepositoryAdapter();
  });

  afterEach(async () => {
    await connection.query('DELETE from payment_providers');
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('save', () => {
    it('Should be able to save a PaymentProvider aggregate', async () => {
      const paymentProvider =
        Mocks.PaymentProviderDomainObjectBuilder().build();

      await expect(
        mysqlRepositoryAdapter.save(paymentProvider),
      ).resolves.not.toThrow();
    });

    it('Should be able to save a PaymentProvider aggregate that`s already exists', async () => {
      const paymentProvider =
        Mocks.PaymentProviderDomainObjectBuilder().build();

      await mysqlRepositoryAdapter.save(paymentProvider);
      paymentProvider.authToken = '123456';
      const lastAuthToken = paymentProvider.authToken;
      await mysqlRepositoryAdapter.save(paymentProvider);

      await expect(
        mysqlRepositoryAdapter.findOneById(paymentProvider.id),
      ).resolves.toEqual(expect.objectContaining({ authToken: lastAuthToken }));
    });
  });

  describe('findOneById', () => {
    it('Should be able to retrieve a PaymentProvider aggregate by id', async () => {
      const paymentProvider =
        Mocks.PaymentProviderDomainObjectBuilder().build();
      const expectedPaymentProvider = paymentProvider;

      await mysqlRepositoryAdapter.save(paymentProvider);
      const paymentProviderFetched = await mysqlRepositoryAdapter.findOneById(
        paymentProvider.id,
      );

      expect(paymentProviderFetched).toBeInstanceOf(PaymentProvider);
      expect(paymentProviderFetched).toEqual(expectedPaymentProvider);
    });

    it('Should be able to get undefined if a PaymentProvider doesnt exists', async () => {
      const paymentProviderFetched = await mysqlRepositoryAdapter.findOneById(
        'x',
      );
      expect(paymentProviderFetched).toBe(undefined);
    });
  });
});
