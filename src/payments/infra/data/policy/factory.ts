import * as Nest from '@nestjs/common';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { Policy, ProviderLiable, Requirements } from '@payments/domain';
import { PolicyActiveRecord } from './policy.ar';

export class PolicyFactory {
  public static toDomainObject(policyAR: PolicyActiveRecord): Policy {
    try {
      return new Policy(
        policyAR.id,
        policyAR.fee,
        this.remakeRequirementsFrom(policyAR),
        this.remakeProviderLiablesFrom(policyAR),
        policyAR.createdAt,
      );
    } catch (err) {
      new NestAddons.AppLogger(PolicyFactory.name).error(
        new ErrorLog(err, `Error while remaking Policy from active record`, {
          policyAR,
        }),
      );

      if (err instanceof Nest.HttpException) throw err;

      throw new Nest.InternalServerErrorException(
        'Error while remaking Policy from active record',
      );
    }
  }

  private static remakeRequirementsFrom(
    policyAR: PolicyActiveRecord,
  ): Requirements {
    return new Requirements(
      policyAR.requirements.minAccountMonths,
      policyAR.requirements.candidateType,
    );
  }

  private static remakeProviderLiablesFrom(
    policyAR: PolicyActiveRecord,
  ): ProviderLiable[] {
    return policyAR.providerLiables.map(
      (pl) => new ProviderLiable(pl.paymentProviderId, pl.paymentMethod),
    );
  }
}
