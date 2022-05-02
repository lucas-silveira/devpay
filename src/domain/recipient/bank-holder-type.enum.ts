export enum BankHolderType {
  Individual = 'individual',
  Company = 'company',
}

export const getAcceptedBankHolderTypes = (): BankHolderType[] => {
  return Object.values(BankHolderType);
};
