import * as Nest from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { IPoliciesRepository, Policy } from '@payments/domain';
import { PolicyFactory } from './factory';
import { PolicyActiveRecord } from './policy.ar';

export class MysqlRepositoryAdapter implements IPoliciesRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryAdapter.name,
  );

  public async save(policy: Policy): Promise<void> {
    try {
      await PolicyActiveRecord.getRepository().save(cloneDeep(policy));
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while saving Policy: ${policy.id}`, {
          policy,
        }),
      );

      throw new Nest.InternalServerErrorException(
        `Error while saving Policy: ${policy.id}`,
      );
    }
  }

  public async findOneById(id: string): Promise<Policy> {
    try {
      const policyAR = await PolicyActiveRecord.createQueryBuilder('policy')
        .where('policy.id = :id', { id })
        .getOne();
      return PolicyFactory.toDomainObject(policyAR);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while fetching Policy by id ${id}`, {
          policyId: id,
        }),
      );

      throw new Nest.InternalServerErrorException(
        `Error while fetching Policy by id ${id}`,
      );
    }
  }
}
