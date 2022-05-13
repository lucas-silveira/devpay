import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as Utils from '@shared/utils';
import { CreatePaymentDto } from './create-payment.dto';

describe('CreatePaymentDto', () => {
  it('Should be able to validate payload without error', async () => {
    const dto = plainToInstance(CreatePaymentDto, {
      rid: 1,
      oid: '12345',
      amount: '9.90',
      cardToken: 'token_123',
      customer: {
        name: 'John',
        document: '123456789',
      },
    });

    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('rid property', () => {
    it('Should be able to get error if rid is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: undefined,
        oid: '12345',
        amount: '9.90',
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
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

    it('Should be able to get error if rid is not number', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: 'x',
        oid: '12345',
        amount: '9.90',
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isInt'),
      ).toBe(true);
    });
  });

  describe('oid property', () => {
    it('Should be able to get error if oid is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: undefined,
        amount: '9.90',
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
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

    it('Should be able to get error if oid is not string', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: 12345,
        amount: '9.90',
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });
  });

  describe('amount property', () => {
    it('Should be able to get error if amount is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: '12345',
        amount: undefined,
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
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

    it('Should be able to get error if amount is not currency', async () => {
      const dto1 = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: '12345',
        amount: '9.9',
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
      });
      const dto2 = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: '12345',
        amount: 9,
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
      });
      const dto3 = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: '12345',
        amount: 'x',
        cardToken: 'token_123',
        customer: {
          name: 'John',
          document: '123456789',
        },
      });

      const errors1: ValidationError[] = await validate(dto1);
      expect(errors1.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors1?.at(0)?.constraints,
          'isCurrency',
        ),
      ).toBe(true);

      const errors2: ValidationError[] = await validate(dto2);
      expect(errors2.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors2?.at(0)?.constraints,
          'isCurrency',
        ),
      ).toBe(true);

      const errors3: ValidationError[] = await validate(dto3);
      expect(errors3.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(
          errors3?.at(0)?.constraints,
          'isCurrency',
        ),
      ).toBe(true);
    });
  });

  describe('cardToken property', () => {
    it('Should be able to get error if cardToken is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: '12345',
        amount: '9.90',
        cardToken: undefined,
        customer: {
          name: 'John',
          document: '123456789',
        },
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

    it('Should be able to get error if cardToken is not string', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: '12345',
        amount: '9.90',
        cardToken: 123,
        customer: {
          name: 'John',
          document: '123456789',
        },
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });
  });

  describe('customer property', () => {
    it('Should be able to get error if customer is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        rid: 1,
        oid: '12345',
        amount: '9.90',
        cardToken: 'token_123',
        customer: undefined,
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

    describe('customer name property', () => {
      it('Should be able to get error if customer name is empty', async () => {
        const dto = plainToInstance(CreatePaymentDto, {
          rid: 1,
          oid: '12345',
          amount: '9.90',
          cardToken: 'token_123',
          customer: {
            name: undefined,
            document: '123456789',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0)?.constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if customer name is not string', async () => {
        const dto = plainToInstance(CreatePaymentDto, {
          rid: 1,
          oid: '12345',
          amount: '9.90',
          cardToken: 'token_123',
          customer: {
            name: 1,
            document: '123456789',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0)?.constraints,
            'isString',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if customer name is greater than 36 chars', async () => {
        const dto = plainToInstance(CreatePaymentDto, {
          rid: 1,
          oid: '12345',
          amount: '9.90',
          cardToken: 'token_123',
          customer: {
            name: 'John Snow John Snow John Snow John Snow',
            document: '123456789',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0)?.constraints,
            'maxLength',
          ),
        ).toBe(true);
      });
    });

    describe('customer document property', () => {
      it('Should be able to get error if customer document is empty', async () => {
        const dto = plainToInstance(CreatePaymentDto, {
          rid: 1,
          oid: '12345',
          amount: '9.90',
          cardToken: 'token_123',
          customer: {
            name: 'John',
            document: undefined,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0)?.constraints,
            'isNotEmpty',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if customer document is not string', async () => {
        const dto = plainToInstance(CreatePaymentDto, {
          rid: 1,
          oid: '12345',
          amount: '9.90',
          cardToken: 'token_123',
          customer: {
            name: 'John',
            document: 123456789,
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0)?.constraints,
            'isString',
          ),
        ).toBe(true);
      });

      it('Should be able to get error if customer name is greater than 36 chars', async () => {
        const dto = plainToInstance(CreatePaymentDto, {
          rid: 1,
          oid: '12345',
          amount: '9.90',
          cardToken: 'token_123',
          customer: {
            name: 'John',
            document: '1234567891234567891234567891234567891',
          },
        });

        const errors: ValidationError[] = await validate(dto);
        expect(errors.length).toBe(1);
        expect(
          Utils.ObjectChecker.fieldExists(
            errors?.at(0)?.children?.at(0)?.constraints,
            'maxLength',
          ),
        ).toBe(true);
      });
    });
  });
});
