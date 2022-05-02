export enum BankAccountType {
  Checking = 'checking',
  Savings = 'sevings',
}

export const getAcceptedBankAccountTypes = (): BankAccountType[] => {
  return Object.values(BankAccountType);
};
