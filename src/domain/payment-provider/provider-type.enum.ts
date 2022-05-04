export enum ProviderType {
  Bank = 'bank',
  Acquirer = 'acquirer',
}

export const getAccepetedProviderTypes = (): ProviderType[] => {
  return Object.values(ProviderType);
};
