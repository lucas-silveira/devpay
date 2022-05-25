import * as Nest from '@nestjs/common';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { PaymentProvider } from '@payments/domain';
import { PaymentProviderActiveRecord } from './payment-provider.ar';

export class PaymentProviderFactory {
  public static toDomainObject(
    paymentProviderAR: PaymentProviderActiveRecord,
  ): PaymentProvider {
    try {
      return new PaymentProvider(
        paymentProviderAR.id,
        paymentProviderAR.type,
        paymentProviderAR.acceptedPaymentMethods,
        paymentProviderAR.authToken,
      );
    } catch (err) {
      new NestAddons.AppLogger(PaymentProviderFactory.name).error(
        new ErrorLog(
          err,
          `Error while remaking PaymentProvider from active record`,
          {
            paymentProviderAR,
          },
        ),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while remaking PaymentProvider from active record',
      );
    }
  }
}
