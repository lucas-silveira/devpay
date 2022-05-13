import * as Validator from 'class-validator';
import { RecipientType } from '@domain/recipient';

export class CreateRecipientDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(16)
  public readonly firstName: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.MaxLength(16)
  public readonly lastName: string;

  @Validator.IsNotEmpty()
  @Validator.IsEmail()
  @Validator.MaxLength(32)
  public readonly email: string;

  @Validator.IsNotEmpty()
  @Validator.Matches(/^[\d+\.-]+$/)
  @Validator.MaxLength(24)
  public readonly document: string;

  @Validator.IsNotEmpty()
  @Validator.IsEnum(RecipientType)
  public readonly type: RecipientType;
}
