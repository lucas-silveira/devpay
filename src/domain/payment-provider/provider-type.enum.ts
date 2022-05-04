export enum ProviderType {
  Bank = 'bank',
  Acquirer = 'acquirer',
}

export const getAcceptedProviderTypes = (): ProviderType[] => {
  return Object.values(ProviderType);
};
