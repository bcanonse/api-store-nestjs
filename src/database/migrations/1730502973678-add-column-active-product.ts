import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnActiveProduct1730502973678
  implements MigrationInterface
{
  name = 'AddColumnActiveProduct1730502973678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "active"`,
    );
  }
}
