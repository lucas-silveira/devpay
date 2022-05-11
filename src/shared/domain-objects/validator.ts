import { DomainException } from '@shared/infra-objects';

export const checkIfIsEmpty = (aValue: unknown, errMessage: string): void => {
  const isEmptyValue = aValue === null || aValue === undefined || aValue === '';
  const isEmptyObject =
    typeof aValue === 'object' && !Object.keys(aValue || {}).length;
  const isEmptyArray = Array.isArray(aValue) && !aValue.length;
  const isEmpty = isEmptyValue || isEmptyObject || isEmptyArray;

  if (isEmpty) throw new DomainException(errMessage);
};

export const checkIfIsAValidEnum = (
  anEnum: Record<string, unknown>,
  aValue: unknown,
  errMessage: string,
): void => {
  const isArray = Array.isArray(aValue);
  const validate = (value: unknown) => !Object.values(anEnum).includes(value);
  const isInvalid = isArray ? aValue.some(validate) : validate(aValue);

  if (isInvalid) throw new DomainException(errMessage);
};

export const checkIfIsGreaterThanMax = (
  aValue: unknown,
  max: number,
  errMessage: string,
): void => {
  if (isNaN(<number>aValue) || aValue > max)
    throw new DomainException(errMessage);
};

export const checkIfIsLowerThanMin = (
  aValue: unknown,
  min: number,
  errMessage: string,
): void => {
  if (isNaN(<number>aValue) || aValue < min)
    throw new DomainException(errMessage);
};

export const checkIfIsNaN = (aValue: unknown, errMessage: string): void => {
  if (isNaN(<number>aValue)) throw new DomainException(errMessage);
};

export const checkIfIsInteger = (aValue: unknown, errMessage: string): void => {
  if (!Number.isInteger(aValue)) throw new DomainException(errMessage);
};
