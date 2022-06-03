import { Test, TestingModule } from '@nestjs/testing';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { connections, Types as MongoTypes } from 'mongoose';
import { AppModule } from 'src/app.module';
import * as Tests from '@shared/testing';
import * as Mocks from '@payments/infra/mocks';
import { PaymentsModule } from '@payments/payments.module';
import { EventStoreDecorator } from '../event-store.decorator';
import { MongoEventStoreAdapter } from '../mongo-event-store.adapter';

Tests.databaseScope('EventStoreDecorator', () => {
  let moduleRef: TestingModule;
  let amqpConnection: AmqpConnection;
  let mongoEventStoreAdapter: MongoEventStoreAdapter;
  let eventStoreDecorator: EventStoreDecorator;
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

    amqpConnection = moduleRef.get<AmqpConnection>(AmqpConnection);
    mongoEventStoreAdapter = moduleRef.get<MongoEventStoreAdapter>(
      'PaymentEventStoreAdapter',
    );
    eventStoreDecorator =
      moduleRef.get<EventStoreDecorator>('PaymentEventStore');
  });

  afterEach(async () => {
    await connections[1]
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
    const amqpConnectionSpy = jest.spyOn(amqpConnection, 'publish');

    await expect(
      eventStoreDecorator.append(paymentEvent),
    ).resolves.not.toThrow();
    expect(mongoEventStoreAdapterSpy).toBeCalledWith(
      paymentEvent,
      jasmine.any(Object),
    );
    expect(amqpConnectionSpy).toBeCalledWith(
      'devpay.topic',
      paymentEvent.name,
      paymentEvent,
      { persistent: true },
    );
  });
});
