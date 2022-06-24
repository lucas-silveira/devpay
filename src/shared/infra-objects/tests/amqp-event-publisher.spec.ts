import * as Nest from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { AppModule } from 'src/app.module';
import * as Tests from '@shared/testing';
import { AccountCreated } from '@accounts/domain';
import { AmqpEventPublisher } from '../amqp-event-publisher';

Tests.serviceScope('AmqpEventPublisher', () => {
  let moduleRef: TestingModule;
  let amqpConn: AmqpConnection;
  let amqpEventPublisher: AmqpEventPublisher;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule.imports[0]],
      providers: [
        AmqpEventPublisher,
        { provide: AmqpConnection, useValue: Tests.amqpConnectionMock },
      ],
    }).compile();

    amqpConn = moduleRef.get<AmqpConnection>(AmqpConnection);
    amqpEventPublisher = moduleRef.get<AmqpEventPublisher>(AmqpEventPublisher);
  });

  describe('publish', () => {
    it('Should be able to publish an event', () => {
      const event = new AccountCreated(
        1,
        'John Snow',
        'john@snow.com',
        '123456789',
      );
      const amqpConnSpy = jest.spyOn(amqpConn, 'publish');

      expect(() => amqpEventPublisher.publish(event)).not.toThrow();
      expect(amqpConnSpy).toBeCalledWith('devpay.topic', event.key, event, {
        persistent: true,
      });
    });

    it('Should be able to throw a BadGatewayException if an error occurs', () => {
      const event = new AccountCreated(
        1,
        'John Snow',
        'john@snow.com',
        '123456789',
      );
      jest.spyOn(amqpConn, 'publish').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(() => amqpEventPublisher.publish(event)).toThrowError(
        Nest.BadGatewayException,
      );
    });
  });
});
