import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as Tests from '@shared/testing';
import * as Utils from '@shared/utils';
import * as Mocks from '@accounts/infra/mocks';
import { CreateAccountDto } from '../create-account.dto';

Tests.unitScope('CreateAccountDto', () => {
  const accountDto: CreateAccountDto = Mocks.AccountPlainObjectBuilder()
    .withoutFields('id', 'secretKey', 'policyId', 'createdAt')
    .build();

  it('Should be able to validate payload without error', async () => {
    const dto = plainToInstance(CreateAccountDto, accountDto);

    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('firstName property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
        firstName: 1,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });

    it('Should be able to get error if is greater than 16 chars', async () => {
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
        lastName: 1,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });

    it('Should be able to get error if is greater than 16 chars', async () => {
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
        email: 'email',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isEmail'),
      ).toBe(true);
    });

    it('Should be able to get error if is greater than 32 chars', async () => {
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto1 = plainToInstance(CreateAccountDto, {
        ...accountDto,
        document: 123,
      });
      const dto2 = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
      const dto = plainToInstance(CreateAccountDto, {
        ...accountDto,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto1 = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
            document: 123,
          },
        });
        const dto2 = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
        const dto = plainToInstance(CreateAccountDto, {
          ...accountDto,
          bankAccount: {
            ...accountDto.bankAccount,
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
