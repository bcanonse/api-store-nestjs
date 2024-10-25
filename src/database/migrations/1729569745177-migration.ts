import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1729569745177
  implements MigrationInterface
{
  name = 'Migration1729569745177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(500), "price" numeric(10,2) NOT NULL DEFAULT '0', "stock" numeric(10,2) NOT NULL DEFAULT '0', "image" character varying NOT NULL, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "pk_product_id" PRIMARY KEY ("id")); COMMENT ON COLUMN "products"."id" IS 'Id product table'`,
    );
    await queryRunner.query(
      `COMMENT ON TABLE "products" IS 'Table to store products'`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "pk_users_id" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'Primary key table'; COMMENT ON COLUMN "users"."email" IS 'Email of user'; COMMENT ON COLUMN "users"."password" IS 'Password of user'; COMMENT ON COLUMN "users"."role" IS 'Role of user'`,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `COMMENT ON TABLE "products" IS NULL`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
