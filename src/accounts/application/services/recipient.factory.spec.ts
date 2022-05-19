import * as Nest from '@nestjs/common';
import { DomainException } from '@shared/infra-objects';
import { Recipient } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { Response } from '../dtos';
import { RecipientFactory } from './recipient.factory';

describe('RecipientFactory', () => {
  describe('from', () => {
    it('Should be able to create a Recipient', async () => {
      const recipientDto = Mocks.RecipientPlainObjectBuilder()
        .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
        .build();
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

      const recipient = await RecipientFactory.from(recipientDto);
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

  describe('toDto', () => {
    it('Should be able to create a RecipientDto', () => {
      const recipient = Mocks.RecipientDomainObjectBuilder().build();
      const expectedRecipient = {
        id: 1,
        firstName: 'John',
        lastName: 'Snow',
        email: 'john@snow.com',
        document: '123456789',
        type: 'individual',
        policyId: 'default',
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

      const recipientDto = RecipientFactory.toDto(recipient);
      expect(recipientDto).toBeInstanceOf(Response.RecipientDto);
      expect(recipientDto.bankAccount).toBeInstanceOf(Response.BankAccountDto);
      expect(recipientDto).toEqual(expectedRecipient);
    });

    it('Should be able to throw an InternalServerErrorException if an unknown error occurs', async () => {
      expect(() => RecipientFactory.toDto(undefined)).toThrowError(
        Nest.InternalServerErrorException,
      );
    });
  });
});
