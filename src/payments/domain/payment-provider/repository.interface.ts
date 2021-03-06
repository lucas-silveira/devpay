import { PaymentProvider } from './payment-provider.entity';

export interface IPaymentProvidersRepository {
  save(paymentProvider: PaymentProvider): Promise<void>;
  findOneById(id: string): Promise<PaymentProvider>;
}
