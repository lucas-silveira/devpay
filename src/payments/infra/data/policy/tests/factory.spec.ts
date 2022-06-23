import * as Nest from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import {
  Features,
  Policy,
  ProviderLiable,
  Requirements,
} from '@payments/domain';
import * as Mocks from '@payments/infra/mocks';
import { PolicyFactory } from '../factory';
import { PolicyActiveRecord } from '../policy.ar';

Tests.databaseScope('Factory', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should be able to remake a Policy', () => {
    const policy = Mocks.PolicyDomainObjectBuilder().build();
    const policyAR = PolicyActiveRecord.create(policy);
    const newpolicy = PolicyFactory.toDomainObject(policyAR);

    expect(newpolicy).toBeInstanceOf(Policy);
    expect(newpolicy.requirements).toBeInstanceOf(Requirements);
    expect(newpolicy.features).toBeInstanceOf(Features);
    expect(newpolicy.features.providerLiables[0]).toBeInstanceOf(
      ProviderLiable,
    );
    expect(newpolicy.createdAt).toBeInstanceOf(Date);
    expect(newpolicy).toEqual(policy);
  });

  it('Should be able to throw a DomainException if constructor throw it', async () => {
    const policy = Mocks.PolicyDomainObjectBuilder()
      .withFields({ id: 'defaultdefaultdefaultdefaultdefault' })
      .build();
    const policyAR = PolicyActiveRecord.create(policy);

    expect(() => PolicyFactory.toDomainObject(policyAR)).toThrowError(
      DomainException,
    );
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', () => {
    expect(() => PolicyFactory.toDomainObject(undefined)).toThrowError(
      Nest.InternalServerErrorException,
    );
  });
});
