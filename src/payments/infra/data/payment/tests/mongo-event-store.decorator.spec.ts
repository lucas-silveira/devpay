import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Connection, connections, Types as MongoTypes } from 'mongoose';
import { AppModule } from 'src/app.module';
import * as Tests from '@shared/testing';
import * as Mocks from '@payments/infra/mocks';
import { PaymentsModule } from '@payments/payments.module';
import { MongoEventStoreAdapter } from '../mongo-event-store.adapter';
import { MongoEventStoreDecorator } from '../mongo-event-store.decorator';

Tests.databaseScope('MongoEventStoreDecorator', () => {
  let moduleRef: TestingModule;
  let mongoConn: Connection;
  let amqpConn: AmqpConnection;
  let mongoEventStoreAdapter: MongoEventStoreAdapter;
  let eventStoreDecorator: MongoEventStoreDecorator;
  const testPid = '6290315378d50b220f49321c';

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AppModule.imports[0],
        AppModule.imports[2],
        PaymentsModule.imports[1],
      ],
      providers: [
        {
          provide: AmqpConnection,
          useValue: Tests.amqpConnectionMock,
        },
        PaymentsModule.providers[4],
        PaymentsModule.providers[5],
      ],
    }).compile();

    mongoConn = connections[1];
    amqpConn = moduleRef.get<AmqpConnection>(AmqpConnection);
    mongoEventStoreAdapter = moduleRef.get<MongoEventStoreAdapter>(
      'PaymentEventStoreAdapter',
    );
    eventStoreDecorator =
      moduleRef.get<MongoEventStoreDecorator>('PaymentEventStore');
  });

  afterEach(async () => {
    await mongoConn
      .collection('payments_store')
      .deleteMany({ pid: new MongoTypes.ObjectId(testPid) });
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('Should be able to append a new PaymentEvent', async () => {
    const paymentEvent = Mocks.PaymentEventDomainObjectBuilder()
      .withFields({ pid: testPid })
      .build();
    const mongoEventStoreAdapterSpy = jest.spyOn(
      mongoEventStoreAdapter,
      'append',
    );
    const amqpConnSpy = jest.spyOn(amqpConn, 'publish');

    await expect(
      eventStoreDecorator.append(paymentEvent),
    ).resolves.not.toThrow();
    expect(mongoEventStoreAdapterSpy).toBeCalledWith(
      paymentEvent,
      jasmine.any(Object),
    );
    expect(amqpConnSpy).toBeCalledWith(
      'devpay.topic',
      paymentEvent.key,
      paymentEvent,
      { persistent: true },
    );
    const paymentEventFromDb = await mongoConn
      .collection('payments_store')
      .findOne({ pid: new MongoTypes.ObjectId(paymentEvent.pid) });
    expect(paymentEventFromDb).toBeTruthy();
  });

  it('Should be able to rollback PaymentEvent if an error occurs while publishing message', async () => {
    const paymentEvent = Mocks.PaymentEventDomainObjectBuilder()
      .withFields({ pid: testPid })
      .build();
    const mongoEventStoreAdapterSpy = jest.spyOn(
      mongoEventStoreAdapter,
      'append',
    );
    jest.spyOn(amqpConn, 'publish').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(eventStoreDecorator.append(paymentEvent)).rejects.toThrowError(
      Nest.BadGatewayException,
    );
    expect(mongoEventStoreAdapterSpy).toBeCalledWith(
      paymentEvent,
      jasmine.any(Object),
    );
    const paymentEventFromDb = await mongoConn
      .collection('payments_store')
      .findOne({ pid: new MongoTypes.ObjectId(paymentEvent.pid) });
    expect(paymentEventFromDb).toBeFalsy();
  });
});
