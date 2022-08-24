import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, connections, Types as MongoTypes } from 'mongoose';
import { AppModule } from 'src/app.module';
import * as Tests from '@shared/testing';
import { IEventStreamPublisher } from '@payments/domain';
import * as Mocks from '@payments/infra/mocks';
import { PaymentsModule } from '@payments/payments.module';

Tests.ioScope('MongoEventStoreDecorator', () => {
  let moduleRef: TestingModule;
  let mongoConn: Connection;
  let eventStreamPublisherAdapter: IEventStreamPublisher;
  let mongoEventStoreDecorator: IEventStreamPublisher;
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
    eventStreamPublisherAdapter = moduleRef.get<IEventStreamPublisher>(
      'EventStreamPublisherAdapter',
    );
    mongoEventStoreDecorator = moduleRef.get<IEventStreamPublisher>(
      'EventStreamPublisher',
    );
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
    const eventStreamPublisherAdapterSpy = jest.spyOn(
      eventStreamPublisherAdapter,
      'publish',
    );
    const eventPublisherSpy = jest.spyOn(
      eventStreamPublisherAdapter,
      'publish',
    );

    await expect(
      mongoEventStoreDecorator.publish(paymentEvent),
    ).resolves.not.toThrow();
    expect(eventStreamPublisherAdapterSpy).toBeCalledWith(paymentEvent);
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
    const eventStreamPublisherAdapterSpy = jest.spyOn(
      eventStreamPublisherAdapter,
      'publish',
    );
    jest
      .spyOn(eventStreamPublisherAdapter, 'publish')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    await expect(
      mongoEventStoreDecorator.publish(paymentEvent),
    ).rejects.toThrowError(Nest.BadGatewayException);
    expect(eventStreamPublisherAdapterSpy).toBeCalledWith(paymentEvent);
    const paymentEventFromDb = await mongoConn
      .collection('payments_store')
      .findOne({ pid: new MongoTypes.ObjectId(paymentEvent.pid) });
    expect(paymentEventFromDb).toBeFalsy();
  });
});
