import * as Validator from 'class-validator';

export class CreatePaymentDto {
  @Validator.IsNotEmpty()
  @Validator.IsInt()
  public readonly recipientId: number;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  public readonly orderId: string;

  @Validator.IsNotEmpty()
  @Validator.IsInt()
  @Validator.Min(0)
  public readonly amount: Cents;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  public readonly cardToken: string;
}
