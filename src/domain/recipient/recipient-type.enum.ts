export enum RecipientType {
  Individual = 'individual',
  Company = 'company',
}

export const getAcceptedRecipientTypes = (): RecipientType[] => {
  return Object.values(RecipientType);
};
