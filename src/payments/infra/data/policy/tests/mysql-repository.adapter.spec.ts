import { Connection, createConnection } from 'typeorm';
import * as Tests from '@shared/testing';
import { Policy } from '@payments/domain';
import * as Mocks from '@payments/infra/mocks';
import { MysqlRepositoryAdapter } from '../mysql-repository.adapter';

Tests.databaseScope('MysqlRepositoryAdapter', () => {
  let connection: Connection;
  let mysqlRepositoryAdapter: MysqlRepositoryAdapter;

  beforeAll(async () => {
    connection = await createConnection();
    mysqlRepositoryAdapter = new MysqlRepositoryAdapter();
  });

  beforeEach(async () => {
    await connection.query('DELETE from policies');
  });

  afterAll(async () => {
    await connection.query('DELETE from policies');
    await connection.close();
  });

  describe('save', () => {
    it('Should be able to save a Policy aggregate', async () => {
      const policy = Mocks.PolicyDomainObjectBuilder().build();

      await expect(mysqlRepositoryAdapter.save(policy)).resolves.not.toThrow();
    });

    it('Should be able to save a Policy aggregate that`s already exists', async () => {
      const policy = Mocks.PolicyDomainObjectBuilder().build();

      await mysqlRepositoryAdapter.save(policy);
      policy.fee = 0.2;
      const lastFee = policy.fee;
      await mysqlRepositoryAdapter.save(policy);

      await expect(
        mysqlRepositoryAdapter.findOneById(policy.id),
      ).resolves.toEqual(expect.objectContaining({ fee: lastFee }));
    });
  });

  describe('findOneById', () => {
    it('Should be able to retrieve a Policy aggregate by id', async () => {
      const policy = Mocks.PolicyDomainObjectBuilder().build();

      await mysqlRepositoryAdapter.save(policy);

      const expectedPolicy = { ...policy, createdAt: jasmine.any(Date) };
      const policyFetched = await mysqlRepositoryAdapter.findOneById(policy.id);

      expect(policyFetched).toBeInstanceOf(Policy);
      expect(policyFetched).toEqual(expectedPolicy);
    });

    it('Should be able to get undefined if a Policy doesnt exists', async () => {
      const policyFetched = await mysqlRepositoryAdapter.findOneById('x');
      expect(policyFetched).toBe(undefined);
    });
  });
});
