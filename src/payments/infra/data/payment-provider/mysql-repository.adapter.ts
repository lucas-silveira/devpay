import * as Nest from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { Repository } from 'typeorm';
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

  constructor(
    @InjectRepository(PaymentProviderActiveRecord)
    private readonly mysqlRepository: Repository<PaymentProviderActiveRecord>,
  ) {}

  public async save(paymentProvider: PaymentProvider): Promise<void> {
    try {
      await this.mysqlRepository.save(cloneDeep(paymentProvider));
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
      const paymentProviderAR = await this.mysqlRepository
        .createQueryBuilder('paymentProvider')
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
