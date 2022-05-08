export class CustomerDto {
  public readonly name: string;
  public readonly document: string;
}

export class PaymentDto {
  public readonly rid: number;
  public readonly oid: string;
  public readonly amount: number;
  public readonly customer: CustomerDto;
  public readonly cardToken: string;
}
