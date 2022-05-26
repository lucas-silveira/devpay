import { Policy } from './policy.entity';

export interface IPoliciesRepository {
  save(policy: Policy): Promise<void>;
  findOneById(id: string): Promise<Policy>;
}
