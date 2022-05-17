import { InternalServerErrorException } from '@nestjs/common';
import { DomainException } from '@shared/infra-objects';
import { Recipient } from '@domain/recipient';
import * as Mocks from '@infra/mocks';
import { Request } from '@application/dtos';
import { RecipientFactory } from './recipient.factory';

describe('RecipientFactory', () => {
  const recipientDto: Request.CreateRecipientDto =
    Mocks.RecipientPlainObjectBuilder()
      .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
      .build();

  it('Should be able to create a Recipient', async () => {
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
    await expect(
      RecipientFactory.from({ ...recipientDto, type: 'X' as any }),
    ).rejects.toThrowError(DomainException);
  });

  it('Should be able to throw an InternalServerErrorException if an unknown error occurs', async () => {
    await expect(RecipientFactory.from(undefined)).rejects.toThrowError(
      InternalServerErrorException,
    );
  });
});
