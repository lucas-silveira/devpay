export enum BankAccountType {
  Checking = 'checking',
  Savings = 'sevings',
}

export const getAcceptedBankAccountTypes = (): BankAccountType[] =>
  Object.values(BankAccountType);
