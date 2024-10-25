import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1729875267617
  implements MigrationInterface
{
  name = 'Migration1729875267617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(255), "registerCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registerUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "pk_customers_id" PRIMARY KEY ("id")); COMMENT ON COLUMN "customers"."id" IS 'Primary key table'; COMMENT ON COLUMN "customers"."name" IS 'Name of customer'; COMMENT ON COLUMN "customers"."lastName" IS 'Last name of customer'; COMMENT ON COLUMN "customers"."phone" IS 'Phone of customer'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "customerId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_c6c520dfb9a4d6dd749e73b13de" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users"."customerId" IS 'Primary key table'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "registerCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "registerUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "fk_users_customer" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "fk_users_customer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "registerUpdatedat"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "registerCreatedat"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users"."customerId" IS 'Primary key table'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_c6c520dfb9a4d6dd749e73b13de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "customerId"`,
    );
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
