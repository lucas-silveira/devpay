import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as Utils from '@shared/utils';
import * as Mocks from '@infra/mocks';
import { CreateRecipientDto } from './create-recipient.dto';

describe('CreateRecipientDto', () => {
  const recipientDto: CreateRecipientDto = Mocks.RecipientPlainObjectBuilder()
    .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
    .build();

  it('Should be able to validate payload without error', async () => {
    const dto = plainToInstance(CreateRecipientDto, recipientDto);

    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('firstName property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        firstName: undefined,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'isNotEmpty',
        ),
      ).toBe(true);
    });

    it('Should be able to get error if is not string', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        firstName: 1,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });

    it('Should be able to get error if is greater than 16 chars', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        firstName: 'JohnSnowJohnSnowJ',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'maxLength',
        ),
      ).toBe(true);
    });
  });

  describe('lastName property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        lastName: undefined,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'isNotEmpty',
        ),
      ).toBe(true);
    });

    it('Should be able to get error if is not string', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        lastName: 1,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });

    it('Should be able to get error if is greater than 16 chars', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        lastName: 'JohnSnowJohnSnowJ',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'maxLength',
        ),
      ).toBe(true);
    });
  });

  describe('email property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        email: undefined,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'isNotEmpty',
        ),
      ).toBe(true);
    });

    it('Should be able to get error if is not email', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        email: 'email',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isEmail'),
      ).toBe(true);
    });

    it('Should be able to get error if is greater than 32 chars', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        email: 'johnsnowjohnsnowjohnsnow@johnsnow.com',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'maxLength',
        ),
      ).toBe(true);
    });
  });

  describe('document property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        document: undefined,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'isNotEmpty',
        ),
      ).toBe(true);
    });

    it('Should be able to get error if is not matching', async () => {
      const dto1 = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        document: 123,
      });
      const dto2 = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        document: '123456x',
      });

      const errors1: ValidationError[] = await validate(dto1);
      const errors2: ValidationError[] = await validate(dto2);
      expect(errors1.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors1?.at(0)?.constraints, 'matches'),
      ).toBe(true);
      expect(errors2.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors2?.at(0)?.constraints, 'matches'),
      ).toBe(true);
    });

    it('Should be able to get error if is greater than 24 chars', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        document: '123456789123456789123456789',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'maxLength',
        ),
      ).toBe(true);
    });
  });

  describe('type property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        type: undefined,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'isNotEmpty',
        ),
      ).toBe(true);
    });

    it('Should be able to get error if is not enum value', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        type: 'X',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isEnum'),
      ).toBe(true);
    });
  });

  describe('bankAccount property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreateRecipientDto, {
        ...recipientDto,
        bankAccount: undefined,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors?.at(0)?.constraints,
          'isNotEmptyObject',
        ),
      ).toBe(true);
    });

    describe('bankAccount.holderName property', () => {
      it('Should be able to get error if is empty', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            holderName: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is not string', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            holderName: 1,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isString',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is greater than 32 chars', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            holderName: 'JohnSnowJohnSnowJohnSnowJohnSnowJ',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'maxLength',
          ),
        ).toBe(true);
      });
    });

    describe('bankAccount.holderType property', () => {
      it('Should be able to get error if is empty', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            holderType: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is not enum value', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            holderType: 'X',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isEnum',
          ),
        ).toBe(true);
      });
    });

    describe('bankAccount.document property', () => {
      it('Should be able to get error if is empty', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            document: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is not matching', async () => {
        const dto1 = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            document: 123,
          },
        });
        const dto2 = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            document: '123456x',
          },
        });

        const errors1: ValidationError[] = await validate(dto1);
        const errors2: ValidationError[] = await validate(dto2);
        expect(errors1.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors1?.at(0)?.children?.at(0).constraints,
            'matches',
          ),
        ).toBe(true);
        expect(errors2.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors2?.at(0)?.children?.at(0).constraints,
            'matches',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is greater than 24 chars', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            document: '123456789123456789123456789',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'maxLength',
          ),
        ).toBe(true);
      });
    });

    describe('bankAccount.bankCode property', () => {
      it('Should be able to get error if is empty', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            bankCode: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is not string', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            bankCode: 1,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isString',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is greater than 4 chars', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            bankCode: '12345',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'maxLength',
          ),
        ).toBe(true);
      });
    });

    describe('bankAccount.accountType property', () => {
      it('Should be able to get error if is empty', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountType: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is not enum value', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountType: 'X',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isEnum',
          ),
        ).toBe(true);
      });
    });

    describe('bankAccount.accountNumber property', () => {
      it('Should be able to get error if is empty', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountNumber: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is not string', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountNumber: 1,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isString',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is greater than 32 chars', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountNumber: '111111111111111111111111111111111',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'maxLength',
          ),
        ).toBe(true);
      });
    });

    describe('bankAccount.accountCheckDigit property', () => {
      it('Should be able to get error if is empty', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountCheckDigit: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is not string', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountCheckDigit: 1,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'isString',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if is greater than 32 chars', async () => {
        const dto = plainToInstance(CreateRecipientDto, {
          ...recipientDto,
          bankAccount: {
            ...recipientDto.bankAccount,
            accountCheckDigit: '123',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0).constraints,
            'maxLength',
          ),
        ).toBe(true);
      });
    });
  });
});
