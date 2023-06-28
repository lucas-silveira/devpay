import * as Nest from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/testing';
import { PaymentProvider } from '@payments/domain';
import * as Mocks from '@payments/infra/mocks';
import { PaymentProviderFactory } from '../factory';
import { PaymentProviderActiveRecord } from '../payment-provider.ar';

Tests.integrationScope('Factory', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should be able to remake a Policy', () => {
    const paymentProvider = Mocks.PaymentProviderDomainObjectBuilder().build();
    const paymentProviderAR =
      PaymentProviderActiveRecord.create(paymentProvider);
    const newPaymentProvider =
      PaymentProviderFactory.toDomainObject(paymentProviderAR);

    expect(newPaymentProvider).toBeInstanceOf(PaymentProvider);
    expect(newPaymentProvider).toEqual(paymentProvider);
  });

  it('Should be able to throw a DomainException if constructor throw it', async () => {
    const paymentProvider = Mocks.PaymentProviderDomainObjectBuilder()
      .withFields({ id: 'defaultdefaultdefaultdefaultdefault' })
      .build();
    const paymentProviderAR =
      PaymentProviderActiveRecord.create(paymentProvider);

    expect(() =>
      PaymentProviderFactory.toDomainObject(paymentProviderAR),
    ).toThrowError(DomainException);
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', () => {
    expect(() => PaymentProviderFactory.toDomainObject(undefined)).toThrowError(
      Nest.InternalServerErrorException,
    );
  });
});
