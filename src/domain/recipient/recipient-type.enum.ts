export enum RecipientType {
  Individual = 'individual',
  Company = 'company',
}

export const getAcceptedRecipientTypes = (): RecipientType[] =>
  Object.values(RecipientType);
