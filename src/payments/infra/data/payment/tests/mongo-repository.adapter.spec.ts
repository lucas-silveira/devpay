import { Test, TestingModule } from '@nestjs/testing';
import { connections, Types as MongoTypes } from 'mongoose';
import { AppModule } from 'src/app.module';
import * as Tests from '@shared/testing';
import { PaymentEventKey, PaymentStatus } from '@payments/domain';
import * as Mocks from '@payments/infra/mocks';
import { PaymentsModule } from '@payments/payments.module';
import { MongoRepositoryAdapter } from '../mongo-repository.adapter';

Tests.integrationScope('MongoRepositoryAdapter', () => {
  let moduleRef: TestingModule;
  let mongoRepositoryAdapter: MongoRepositoryAdapter;
  const testPid = '6290315378d50b220f49332c';

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        AppModule.imports[0],
        AppModule.imports[2],
        PaymentsModule.imports[1],
      ],
      providers: [PaymentsModule.providers[3]],
    }).compile();

    mongoRepositoryAdapter =
      moduleRef.get<MongoRepositoryAdapter>('PaymentsRepository');

    // Create some events to be able to get a virtual Payment
    const event1 = Mocks.PaymentEventPlainObjectBuilder()
      .withFields({
        pid: new MongoTypes.ObjectId(testPid) as any,
        data: {
          policyId: 'default',
          orderId: '12345',
          status: PaymentStatus.Pending,
          amount: 100 as any,
          cardToken: '123',
        },
        timestamp: new Date('2022-05-31T00:00:00-00:00'),
      })
      .build();
    const event2 = Mocks.PaymentEventPlainObjectBuilder()
      .withFields({
        key: PaymentEventKey.PaymentAuthorized,
        pid: new MongoTypes.ObjectId(testPid) as any,
        data: {
          status: PaymentStatus.Authorized,
        },
        timestamp: new Date('2022-06-01T00:00:00-00:00'),
      })
      .build();
    const event3 = Mocks.PaymentEventPlainObjectBuilder()
      .withFields({
        key: PaymentEventKey.PaymentCaptured,
        pid: new MongoTypes.ObjectId(testPid) as any,
        data: {
          status: PaymentStatus.Paid,
          paidAmount: 100 as any,
        },
        timestamp: new Date('2022-06-02T00:00:00-00:00'),
      })
      .build();
    await connections[1]
      .collection('payments_store')
      .insertMany([event1, event2, event3]);
  });

  afterEach(async () => {
    await connections[1].collection('payments').deleteMany({});
  });

  afterAll(async () => {
    await connections[1]
      .collection('payments_store')
      .deleteMany({ pid: new MongoTypes.ObjectId(testPid) });
    await moduleRef.close();
  });

  describe('create', () => {
    it('Should be able to create a Payment object', async () => {
      const payment = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: testPid,
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();

      await expect(
        mongoRepositoryAdapter.create(payment),
      ).resolves.not.toThrow();
    });
  });

  describe('findOneById', () => {
    it('Should be able to retrieve a Payment by id', async () => {
      const payment = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: testPid,
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();
      const expectedPayment = {
        ...payment,
        status: 'paid',
        amount: 100,
        paidAmount: 100,
        createdAt: new Date('2022-05-31T00:00:00-00:00'),
        updatedAt: new Date('2022-06-02T00:00:00-00:00'),
      };

      await mongoRepositoryAdapter.create(payment);
      const paymentFetched = await mongoRepositoryAdapter.findOneById(
        payment.id,
      );

      expect(paymentFetched).toEqual(expectedPayment);
    });

    it('Should be able to get undefined if a Payment doesnt exists', async () => {
      const paymentProviderFetched = await mongoRepositoryAdapter.findOneById(
        '6290315378d50b220f49001b',
      );
      expect(paymentProviderFetched).toBe(undefined);
    });
  });

  describe('findByRecipientId', () => {
    it('Should be able to retrieve Payments by recipientId', async () => {
      const recipientId = 1;
      const payment1 = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: testPid,
          recipientId,
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();
      const expectedPayment1 = {
        ...payment1,
        status: 'paid',
        amount: 100,
        paidAmount: 100,
        createdAt: new Date('2022-05-31T00:00:00-00:00'),
        updatedAt: new Date('2022-06-02T00:00:00-00:00'),
      };
      const payment2 = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: '6290315378d50b220f49333b',
          recipientId,
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();
      const expectedPayment2 = {
        ...payment2,
        createdAt: new Date('2022-05-31T00:00:00-00:00'),
      };
      const payment3 = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: '6290315378d50b220f49334a',
          recipientId: 2,
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();

      await mongoRepositoryAdapter.create(payment1);
      await mongoRepositoryAdapter.create(payment2);
      await mongoRepositoryAdapter.create(payment3);
      const paymentsFetched = await mongoRepositoryAdapter.findByRecipientId(
        recipientId,
      );

      expect(paymentsFetched).toEqual([expectedPayment1, expectedPayment2]);
    });

    it('Should be able to get empty array if no payments is found', async () => {
      const paymentProviderFetched =
        await mongoRepositoryAdapter.findByRecipientId(0);
      expect(paymentProviderFetched).toEqual([]);
    });
  });

  describe('findByOrderId', () => {
    it('Should be able to retrieve Payments by orderId', async () => {
      const recipientId = 1;
      const orderId = '12345';
      const payment1 = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: testPid,
          recipientId,
          orderId,
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();
      const expectedPayment1 = {
        ...payment1,
        status: 'paid',
        amount: 100,
        paidAmount: 100,
        createdAt: new Date('2022-05-31T00:00:00-00:00'),
        updatedAt: new Date('2022-06-02T00:00:00-00:00'),
      };
      const payment2 = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: '6290315378d50b220f49333b',
          recipientId,
          orderId,
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();
      const expectedPayment2 = {
        ...payment2,
        createdAt: new Date('2022-05-31T00:00:00-00:00'),
      };
      const payment3 = Mocks.PaymentPlainObjectBuilder()
        .withFields({
          id: '6290315378d50b220f49334a',
          recipientId,
          orderId: '11111',
          createdAt: new Date('2022-05-31T00:00:00-00:00'),
        })
        .withoutFields('status', 'amount', 'paidAmount', 'updatedAt')
        .build();

      await mongoRepositoryAdapter.create(payment1);
      await mongoRepositoryAdapter.create(payment2);
      await mongoRepositoryAdapter.create(payment3);
      const paymentsFetched = await mongoRepositoryAdapter.findByOrderId(
        recipientId,
        orderId,
      );

      expect(paymentsFetched).toEqual([expectedPayment1, expectedPayment2]);
    });

    it('Should be able to get empty array if no payments is found', async () => {
      const paymentProviderFetched = await mongoRepositoryAdapter.findByOrderId(
        0,
        '00000',
      );
      expect(paymentProviderFetched).toEqual([]);
    });
  });
});
