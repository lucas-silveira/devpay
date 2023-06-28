import { TestingModule, Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import * as Tests from '@shared/testing';
import { PaymentProvider } from '@payments/domain';
import * as Mocks from '@payments/infra/mocks';
import { PaymentsModule } from '@payments/payments.module';
import { MysqlRepositoryAdapter } from '../mysql-repository.adapter';

Tests.integrationScope('MysqlRepositoryAdapter', () => {
  let moduleRef: TestingModule;
  let connection: DataSource;
  let mysqlRepositoryAdapter: MysqlRepositoryAdapter;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AppModule.imports[0],
        AppModule.imports[1],
        PaymentsModule.imports[0],
      ],
      providers: [PaymentsModule.providers[2]],
    }).compile();

    connection = moduleRef.get<DataSource>(getConnectionToken());
    mysqlRepositoryAdapter = moduleRef.get<MysqlRepositoryAdapter>(
      'PaymentProvidersRepository',
    );
  });

  afterEach(async () => {
    await connection.query('DELETE from payment_providers');
  });

  afterAll(async () => {
    await connection.destroy();
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
