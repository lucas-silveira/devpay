import * as Nest from '@nestjs/common';
import { cloneDeep } from 'lodash';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { IPaymentProvidersRepository, PaymentProvider } from '@payments/domain';
import { PaymentProviderFactory } from './factory';
import { PaymentProviderActiveRecord } from './payment-provider.ar';

@Nest.Injectable()
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

      throw new Nest.BadGatewayException(
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
      if (paymentProviderAR)
        return PaymentProviderFactory.toDomainObject(paymentProviderAR);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while fetching PaymentProvider by id ${id}`, {
          paymentProviderId: id,
        }),
      );

      throw new Nest.BadGatewayException(
        `Error while fetching PaymentProvider by id ${id}`,
      );
    }
  }
}
