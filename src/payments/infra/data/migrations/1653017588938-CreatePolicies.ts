import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePolicies1653017588938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'policies',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '16',
            isPrimary: true,
          },
          {
            name: 'fee',
            type: 'double',
          },
          {
            name: 'requirements',
            type: 'json',
          },
          {
            name: 'providerLiables',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('policies');
  }
}
