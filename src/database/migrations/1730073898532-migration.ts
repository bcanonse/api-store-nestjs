import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1730073898532
  implements MigrationInterface
{
  name = 'Migration1730073898532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "idx_products_price" ON "products" ("price") `,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_products_price"`,
    );
  }
}
