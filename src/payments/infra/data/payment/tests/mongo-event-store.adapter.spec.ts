import { Test, TestingModule } from '@nestjs/testing';
import { Connection, connections, Types as MongoTypes } from 'mongoose';
import { AppModule } from 'src/app.module';
import * as Tests from '@shared/testing';
import * as Mocks from '@payments/infra/mocks';
import { PaymentsModule } from '@payments/payments.module';
import { MongoEventStoreAdapter } from '../mongo-event-store.adapter';

Tests.databaseScope('MongoEventStoreAdapter', () => {
  let moduleRef: TestingModule;
  let mongoConn: Connection;
  let mongoEventStoreAdapter: MongoEventStoreAdapter;
  const testPid = '6290315378d50b220f49123c';

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AppModule.imports[0],
        AppModule.imports[2],
        PaymentsModule.imports[1],
      ],
      providers: [PaymentsModule.providers[4]],
    }).compile();

    mongoConn = connections[1];
    mongoEventStoreAdapter = moduleRef.get<MongoEventStoreAdapter>(
      'PaymentEventStoreAdapter',
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

  it('Should be able to append a new PaymentEvent', async () => {
    const paymentEvent = Mocks.PaymentEventDomainObjectBuilder()
      .withFields({ pid: testPid })
      .build();

    await expect(
      mongoEventStoreAdapter.append(paymentEvent),
    ).resolves.not.toThrow();
    const paymentEventFromDb = await mongoConn
      .collection('payments_store')
      .findOne({ pid: new MongoTypes.ObjectId(paymentEvent.pid) });
    expect(paymentEventFromDb.pid?.toString()).toEqual(paymentEvent.pid);
  });
});
