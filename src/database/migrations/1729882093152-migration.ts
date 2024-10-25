import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1729882093152
  implements MigrationInterface
{
  name = 'Migration1729882093152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, "registerCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registerUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "uq_brands_name" UNIQUE ("name"), CONSTRAINT "pk_brands_id" PRIMARY KEY ("id")); COMMENT ON COLUMN "brands"."id" IS 'Primary key of brands'`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "brand_id" integer`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."brand_id" IS 'Primary key of brands'`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "fk_products_brand" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "fk_products_brand"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "products"."brand_id" IS 'Primary key of brands'`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "brand_id"`,
    );
    await queryRunner.query(`DROP TABLE "brands"`);
  }
}
