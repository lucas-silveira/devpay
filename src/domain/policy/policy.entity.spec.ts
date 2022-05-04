import { DomainException } from '@shared/infra-objects';
import { PolicyId } from './policy-id.enum';
import { Policy } from './policy.entity';

describe('Policy', () => {
  it('Should be able to create a Policy correctly', () => {
    expect(new Policy(PolicyId.Default, 0.1)).toEqual({
      id: 'default',
      fee: 0.1,
      createdAt: jasmine.any(Date),
    });
  });

  it('Should be able to throw a DomainException if we pass an empty id', () => {
    expect(() => new Policy(undefined, 0.1)).toThrowError(DomainException);
  });

  it('Should be able to throw a DomainException if we pass an empty fee', () => {
    expect(() => new Policy(PolicyId.Default, undefined)).toThrowError(
      DomainException,
    );
  });

  it('Should be able to throw a DomainException if we pass an invalid id', () => {
    expect(() => new Policy('X' as any, 0.1)).toThrowError(DomainException);
  });
});
