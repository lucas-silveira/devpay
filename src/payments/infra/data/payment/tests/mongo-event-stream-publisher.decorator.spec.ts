import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, connections, Types as MongoTypes } from 'mongoose';
import { AppModule } from 'src/app.module';
import * as Tests from '@shared/testing';
import { AmqpEventStreamPublisherAdapter } from '@payments/infra/events';
import * as Mocks from '@payments/infra/mocks';
import { PaymentsModule } from '@payments/payments.module';
import { MongoEventStreamPublisherDecorator } from '../mongo-event-stream-publisher.decorator';

Tests.ioScope('MongoEventStreamPublisherDecorator', () => {
  let moduleRef: TestingModule;
  let mongoConn: Connection;
  let amqpEventStreamPublisherAdapter: AmqpEventStreamPublisherAdapter;
  let mongoEventStreamPublisherDecorator: MongoEventStreamPublisherDecorator;
  const testPid = '6290315378d50b220f49321c';

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AppModule.imports[0],
        AppModule.imports[2],
        PaymentsModule.imports[1],
      ],
      providers: [
        PaymentsModule.providers[5],
        {
          provide: 'EventStreamPublisherAdapter',
          useClass: Mocks.FakeEventStreamPublisher,
        },
      ],
    }).compile();

    mongoConn = connections[1];
    amqpEventStreamPublisherAdapter =
      moduleRef.get<AmqpEventStreamPublisherAdapter>(
        'EventStreamPublisherAdapter',
      );
    mongoEventStreamPublisherDecorator =
      moduleRef.get<MongoEventStreamPublisherDecorator>('EventStreamPublisher');
  });

  afterEach(async () => {
    await mongoConn
      .collection('payments_store')
      .deleteMany({ pid: new MongoTypes.ObjectId(testPid) });
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('Should be able to publish a new PaymentEvent', async () => {
    const paymentEvent = Mocks.PaymentEventDomainObjectBuilder()
      .withFields({ pid: testPid })
      .build();
    const amqpEventStreamPublisherAdapterSpy = jest.spyOn(
      amqpEventStreamPublisherAdapter,
      'publish',
    );
    const eventPublisherSpy = jest.spyOn(
      amqpEventStreamPublisherAdapter,
      'publish',
    );

    await expect(
      mongoEventStreamPublisherDecorator.publish(paymentEvent),
    ).resolves.not.toThrow();
    expect(amqpEventStreamPublisherAdapterSpy).toBeCalledWith(paymentEvent);
    expect(eventPublisherSpy).toBeCalledWith(paymentEvent);
    const paymentEventFromDb = await mongoConn
      .collection('payments_store')
      .findOne({ pid: new MongoTypes.ObjectId(paymentEvent.pid) });
    expect(paymentEventFromDb).toBeTruthy();
  });

  it('Should be able to revert the transaction if an error occurs while publishing message', async () => {
    const paymentEvent = Mocks.PaymentEventDomainObjectBuilder()
      .withFields({ pid: testPid })
      .build();
    const amqpEventStreamPublisherAdapterSpy = jest.spyOn(
      amqpEventStreamPublisherAdapter,
      'publish',
    );
    jest
      .spyOn(amqpEventStreamPublisherAdapter, 'publish')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(
      mongoEventStreamPublisherDecorator.publish(paymentEvent),
    ).rejects.toThrowError(Nest.BadGatewayException);
    expect(amqpEventStreamPublisherAdapterSpy).toBeCalledWith(paymentEvent);
    const paymentEventFromDb = await mongoConn
      .collection('payments_store')
      .findOne({ pid: new MongoTypes.ObjectId(paymentEvent.pid) });
    expect(paymentEventFromDb).toBeFalsy();
  });
});
