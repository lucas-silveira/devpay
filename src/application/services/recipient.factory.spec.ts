import * as Nest from '@nestjs/common';
import { DomainException } from '@shared/infra-objects';
import { Recipient } from '@domain/recipient';
import * as Mocks from '@infra/mocks';
import { RecipientFactory } from './recipient.factory';

describe('RecipientFactory', () => {
  it('Should be able to create a Recipient', async () => {
    const recipientDto = Mocks.RecipientPlainObjectBuilder()
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();
    const recipient = await RecipientFactory.from(recipientDto);
    const expectedRecipient = {
      firstName: 'John',
      lastName: 'Snow',
      email: 'john@snow.com',
      document: '123456789',
      type: 'individual',
      policyId: 'default',
      secretKey: jasmine.any(String),
      bankAccount: {
        holderName: 'John',
        holderType: 'individual',
        document: '12345678',
        bankCode: '123',
        accountType: 'checking',
        accountNumber: '12345',
        accountCheckDigit: '1',
      },
      createdAt: jasmine.any(Date),
    };
    expect(recipient).toBeInstanceOf(Recipient);
    expect(recipient.createdAt).toBeInstanceOf(Date);
    expect(recipient).toEqual(expectedRecipient);
  });

  it('Should be able to throw a DomainException if constructor throw it', async () => {
    const recipientDto = Mocks.RecipientPlainObjectBuilder()
      .withFields({ type: 'X' as any })
      .build();
    await expect(RecipientFactory.from(recipientDto)).rejects.toThrowError(
      DomainException,
    );
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', async () => {
    await expect(RecipientFactory.from(undefined)).rejects.toThrowError(
      Nest.InternalServerErrorException,
    );
  });
});
