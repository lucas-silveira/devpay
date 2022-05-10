export enum BankHolderType {
  Individual = 'individual',
  Company = 'company',
}

export const getAcceptedBankHolderTypes = (): BankHolderType[] =>
  Object.values(BankHolderType);
