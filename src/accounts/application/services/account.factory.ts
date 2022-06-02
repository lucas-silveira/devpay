import * as Nest from '@nestjs/common';
import { ErrorLog } from '@shared/telemetry';
import * as NestAddons from '@shared/nest-addons';
import { Request, Response } from '@accounts/application/dtos';
import { Account, BankAccount } from '@accounts/domain';

export class AccountFactory {
  public static async from(
    accountDto: Request.CreateAccountDto,
  ): Promise<Account> {
    try {
      const account = new Account(
        undefined,
        accountDto.firstName,
        accountDto.lastName,
        accountDto.email,
        accountDto.document,
        accountDto.type,
        undefined,
        undefined,
        new BankAccount(
          accountDto.bankAccount.holderName,
          accountDto.bankAccount.holderType,
          accountDto.bankAccount.document,
          accountDto.bankAccount.bankCode,
          accountDto.bankAccount.accountType,
          accountDto.bankAccount.accountNumber,
          accountDto.bankAccount.accountCheckDigit,
        ),
      );
      await account.giveNewSecretKey();
      return account;
    } catch (err: unknown) {
      new NestAddons.AppLogger(AccountFactory.name).error(
        new ErrorLog(err, 'Error while Account creation', {
          accountDto,
        }),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while Account creation',
      );
    }
  }

  public static toDto(account: Account): Response.AccountDto {
    try {
      return new Response.AccountDto(
        account.id,
        account.firstName,
        account.lastName,
        account.email,
        account.document,
        account.type,
        account.policyId,
        new Response.BankAccountDto(
          account.bankAccount.holderName,
          account.bankAccount.holderType,
          account.bankAccount.document,
          account.bankAccount.bankCode,
          account.bankAccount.accountType,
          account.bankAccount.accountNumber,
          account.bankAccount.accountCheckDigit,
        ),
        account.createdAt,
      );
    } catch (err) {
      new NestAddons.AppLogger(AccountFactory.name).error(
        new ErrorLog(err, 'Error while AccountDto creation', {
          account,
        }),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while AccountDto creation',
      );
    }
  }
}
