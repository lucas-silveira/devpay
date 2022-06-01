import * as Nest from '@nestjs/common';
import * as Mongoose from '@nestjs/mongoose';
import { Document, Model, Types as MongoTypes } from 'mongoose';
import { ErrorLog } from '@shared/apm';
import * as NestAddons from '@shared/nest-addons';
import { IPaymentsRepository, Payment } from '@payments/domain';
import * as Pipelines from './mongo-pipelines';
import { PaymentDocument } from './payment.doc';

@Nest.Injectable()
export class MongoRepositoryAdapter implements IPaymentsRepository {
  private readonly logger = new NestAddons.AppLogger(
    MongoRepositoryAdapter.name,
  );

  constructor(
    @Mongoose.InjectModel(PaymentDocument.name)
    private readonly paymentModel: Model<PaymentDocument & Document>,
  ) {}

  public async create(payment: Payment): Promise<void> {
    try {
      const { id, ...paymentToSave } = payment;
      await this.paymentModel.create({
        ...paymentToSave,
        _id: this.convertToObjectId(id),
      });
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while saving Payment: ${payment.id}`, {
          payment,
        }),
      );

      throw new Nest.BadGatewayException(
        `Error while saving Payment: ${payment.id}`,
      );
    }
  }

  public async findOneById(id: string): Promise<Payment> {
    try {
      const payments = await this.paymentModel.aggregate(
        Pipelines.onePayment({ _id: new MongoTypes.ObjectId(id) }),
      );

      return payments?.at(0);
    } catch (err) {
      this.logger.error(
        new ErrorLog(err, `Error while fetching Payment by id: ${id}`, { id }),
      );

      throw new Nest.BadGatewayException(
        `Error while fetching Payment by id: ${id}`,
      );
    }
  }

  public async findByRecipientId(
    recipientId: number,
    skip = 0,
    limit = 10,
  ): Promise<Payment[]> {
    try {
      const payments = await this.paymentModel.aggregate(
        Pipelines.multiPayments({ recipientId }, skip, Math.min(limit, 100)),
      );

      return payments || [];
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while fetching Payment by recipientId: ${recipientId}`,
          { recipientId },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while fetching Payment by recipientId: ${recipientId}`,
      );
    }
  }

  public async findByOrderId(
    recipientId: number,
    orderId: string,
    skip = 0,
    limit = 10,
  ): Promise<Payment[]> {
    try {
      const payments = await this.paymentModel.aggregate(
        Pipelines.multiPayments(
          { recipientId, orderId },
          skip,
          Math.min(limit, 100),
        ),
      );

      return payments || [];
    } catch (err) {
      this.logger.error(
        new ErrorLog(
          err,
          `Error while fetching Payment by orderId: ${orderId}`,
          { orderId },
        ),
      );

      throw new Nest.BadGatewayException(
        `Error while fetching Payment by orderId: ${orderId}`,
      );
    }
  }

  private convertToObjectId(anId: string): MongoTypes.ObjectId {
    return new MongoTypes.ObjectId(anId);
  }
}
