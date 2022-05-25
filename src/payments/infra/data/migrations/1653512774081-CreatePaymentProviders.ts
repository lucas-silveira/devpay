import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentProviders1653512774081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment_providers',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            length: '16',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['bank', 'acquirer'],
          },
          {
            name: 'acceptedPaymentMethods',
            type: 'json',
          },
          {
            name: 'authToken',
            type: 'varchar',
            length: '24',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment_providers');
  }
}
