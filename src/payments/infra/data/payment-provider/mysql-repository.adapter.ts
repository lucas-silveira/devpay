import * as Nest from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { IPaymentProvidersRepository, PaymentProvider } from '@payments/domain';
import { PaymentProviderFactory } from './factory';
import { PaymentProviderActiveRecord } from './payment-provider.ar';

export class MysqlRepositoryAdapter implements IPaymentProvidersRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryAdapter.name,
  );

  public async save(paymentProvider: PaymentProvider): Promise<void> {
    try {
      await PaymentProviderActiveRecord.getRepository().save(
        cloneDeep(paymentProvider),
      );
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while saving PaymentProvider: ${paymentProvider.id}`,
          {
            paymentProvider,
          },
        ),
      );

      throw new Nest.InternalServerErrorException(
        `Error while saving PaymentProvider: ${paymentProvider.id}`,
      );
    }
  }

  public async findOneById(id: string): Promise<PaymentProvider> {
    try {
      const paymentProviderAR =
        await PaymentProviderActiveRecord.createQueryBuilder('paymentProvider')
          .where('paymentProvider.id = :id', { id })
          .getOne();
      return PaymentProviderFactory.toDomainObject(paymentProviderAR);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while fetching PaymentProvider by id ${id}`, {
          paymentProviderId: id,
        }),
      );

      throw new Nest.InternalServerErrorException(
        `Error while fetching PaymentProvider by id ${id}`,
      );
    }
  }
}
