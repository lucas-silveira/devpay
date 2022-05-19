import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateRecipients1652925505610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipients',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '16',
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '16',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '32',
            isUnique: true,
          },
          {
            name: 'document',
            type: 'varchar',
            length: '24',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['individual', 'company'],
          },
          {
            name: 'secretKey',
            type: 'varchar',
            length: '16',
          },
          {
            name: 'policyId',
            type: 'varchar',
          },
          {
            name: 'bankAccount',
            type: 'json',
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

    await queryRunner.createIndex(
      'recipients',
      new TableIndex({
        name: 'idx_recipients_email',
        columnNames: ['email'],
        isUnique: true,
      }),
    );
    await queryRunner.createIndex(
      'recipients',
      new TableIndex({
        name: 'idx_recipients_secretKey',
        columnNames: ['secretKey'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recipients');
  }
}
