import { Type } from 'class-transformer';
import * as Validator from 'class-validator';

export class CustomerDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(36)
  public readonly name: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(36)
  public readonly document: string;
}

export class CreatePaymentDto {
  @Validator.IsNotEmpty()
  @Validator.IsInt()
  public readonly rid: number;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  public readonly oid: string;

  @Validator.IsNotEmpty()
  @Validator.IsNumber()
  public readonly amount: number;

  @Validator.IsNotEmpty()
  @Validator.ValidateNested()
  @Type(() => CustomerDto)
  public readonly customer: CustomerDto;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  public readonly cardToken: string;
}
