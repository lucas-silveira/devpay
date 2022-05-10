export enum ProviderType {
  Bank = 'bank',
  Acquirer = 'acquirer',
}

export const getAcceptedProviderTypes = (): ProviderType[] =>
  Object.values(ProviderType);
