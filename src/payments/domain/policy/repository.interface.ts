import { Policy } from './policy.entity';

export interface IPoliciesRepository {
  save(policy: Policy): Promise<void>;
  findOneById(id: number): Promise<Policy>;
}
