import * as Nest from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { Repository } from 'typeorm';
import * as NestAddons from '@shared/nest-addons';
import { ErrorLog } from '@shared/telemetry';
import { IPoliciesRepository, Policy } from '@payments/domain';
import { PolicyFactory } from './factory';
import { PolicyActiveRecord } from './policy.ar';

@Nest.Injectable()
export class MysqlRepositoryAdapter implements IPoliciesRepository {
  private readonly logger = new NestAddons.AppLogger(
    MysqlRepositoryAdapter.name,
  );

  constructor(
    @InjectRepository(PolicyActiveRecord)
    private readonly mysqlRepository: Repository<PolicyActiveRecord>,
  ) {}

  public async save(policy: Policy): Promise<void> {
    try {
      await this.mysqlRepository.save(cloneDeep(policy));
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while saving Policy: ${policy.id}`, {
          policy,
        }),
      );

      throw new Nest.BadGatewayException(
        `Error while saving Policy: ${policy.id}`,
      );
    }
  }

  public async findOneById(id: string): Promise<Policy> {
    try {
      const policyAR = await this.mysqlRepository
        .createQueryBuilder('policy')
        .where('policy.id = :id', { id })
        .getOne();
      if (policyAR) return PolicyFactory.toDomainObject(policyAR);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while fetching Policy by id ${id}`, {
          policyId: id,
        }),
      );

      throw new Nest.BadGatewayException(
        `Error while fetching Policy by id ${id}`,
      );
    }
  }
}
