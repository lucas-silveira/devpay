import * as Nest from '@nestjs/common';
import { DomainException } from '@shared/infra-objects';
import * as Tests from '@shared/tests';
import { Response } from '@accounts/application/dtos';
import { Account } from '@accounts/domain';
import * as Mocks from '@accounts/infra/mocks';
import { AccountFactory } from '../account.factory';

Tests.unitScope('AccountFactory', () => {
  describe('from', () => {
    it('Should be able to create a Account', async () => {
      const accountDto = Mocks.AccountPlainObjectBuilder()
        .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
        .build();
      const expectedAccount = {
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

      const account = await AccountFactory.from(accountDto);
      expect(account).toBeInstanceOf(Account);
      expect(account.createdAt).toBeInstanceOf(Date);
      expect(account).toEqual(expectedAccount);
    });

    it('Should be able to throw a DomainException if constructor throw it', async () => {
      const accountDto = Mocks.AccountPlainObjectBuilder()
        .withFields({ type: 'X' as any })
        .build();
      await expect(AccountFactory.from(accountDto)).rejects.toThrowError(
        DomainException,
      );
    });

    it('Should be able to throw an InternalServerErrorException if an unknown error occurs', async () => {
      await expect(AccountFactory.from(undefined)).rejects.toThrowError(
        Nest.InternalServerErrorException,
      );
    });
  });

  describe('toDto', () => {
    it('Should be able to create a AccountDto', () => {
      const account = Mocks.AccountDomainObjectBuilder().build();
      const expectedAccount = {
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

      const accountDto = AccountFactory.toDto(account);
      expect(accountDto).toBeInstanceOf(Response.AccountDto);
      expect(accountDto.bankAccount).toBeInstanceOf(Response.BankAccountDto);
      expect(accountDto).toEqual(expectedAccount);
    });

    it('Should be able to throw an InternalServerErrorException if an unknown error occurs', async () => {
      expect(() => AccountFactory.toDto(undefined)).toThrowError(
        Nest.InternalServerErrorException,
      );
    });
  });
});
