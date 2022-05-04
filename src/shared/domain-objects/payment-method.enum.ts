export enum PaymentMethod {
  CreditCard = 'credit_card',
  DebitCard = 'debit_card',
  Boleto = 'boleto',
  Pix = 'pix',
}

export const getAcceptedPaymentMethods = (): PaymentMethod[] => {
  return Object.values(PaymentMethod);
};
