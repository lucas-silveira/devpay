import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as Tests from '@shared/tests';
import * as Utils from '@shared/utils';
import * as Mocks from '@payments/infra/mocks';
import { CreatePaymentDto } from '../create-payment.dto';

Tests.unitScope('CreatePaymentDto', () => {
  let paymentDto: CreatePaymentDto;

  beforeAll(() => {
    const {
      rid,
      data: {
        amount: { value },
        orderId,
        cardToken,
      },
    } = Mocks.PaymentEventPlainObjectBuilder().build();
    paymentDto = { recipientId: rid, orderId, amount: value, cardToken };
  });

  it('Should be able to validate payload without error', async () => {
    const dto = plainToInstance(CreatePaymentDto, paymentDto);

    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('rid property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        recipientId: undefined,
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

    it('Should be able to get error if is not number', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        recipientId: 'x',
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isInt'),
      ).toBe(true);
    });
  });

  describe('oid property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        orderId: undefined,
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
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        orderId: 12345,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });
  });

  describe('amount property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        amount: undefined,
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

    it('Should be able to get error if is not int', async () => {
      const dto1 = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        amount: 1.2,
      });
      const dto2 = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        amount: '100',
      });
      const dto3 = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        amount: true,
      });

      const errors1: ValidationError[] = await validate(dto1);
      expect(errors1.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors1?.at(0)?.constraints, 'isInt'),
      ).toBe(true);

      const errors2: ValidationError[] = await validate(dto2);
      expect(errors2.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors2?.at(0)?.constraints, 'isInt'),
      ).toBe(true);

      const errors3: ValidationError[] = await validate(dto3);
      expect(errors3.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors3?.at(0)?.constraints, 'isInt'),
      ).toBe(true);
    });

    it('Should be able to get error if is lower than 0', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        amount: -100,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'min'),
      ).toBe(true);
    });
  });

  describe('cardToken property', () => {
    it('Should be able to get error if is empty', async () => {
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        cardToken: undefined,
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
      const dto = plainToInstance(CreatePaymentDto, {
        ...paymentDto,
        cardToken: 123,
      });

      const errors: ValidationError[] = await validate(dto);
      expect(errors.length).toBe(1);
      expect(
        Utils.ObjectChecker.fieldExists(errors?.at(0)?.constraints, 'isString'),
      ).toBe(true);
    });
  });
});
