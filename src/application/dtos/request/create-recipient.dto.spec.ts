import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as Utils from '@shared/utils';
import * as Mocks from '@infra/mocks';
import { CreateRecipientDto } from './create-recipient.dto';

describe('CreateRecipientDto', () => {
  let recipientDto: CreateRecipientDto;

  beforeAll(() => {
    const { firstName, lastName, email, document, type } =
      Mocks.RecipientPlainObjectBuilder().build();
    recipientDto = { firstName, lastName, email, document, type };
  });

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
});
