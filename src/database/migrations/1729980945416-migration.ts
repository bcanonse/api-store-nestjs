import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1729980945416
  implements MigrationInterface
{
  name = 'Migration1729980945416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_products" ("id" SERIAL NOT NULL, "quantity" numeric(10,2) NOT NULL, "productId" integer, "orderId" integer, "registerCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registerUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "pk_order_products_id" PRIMARY KEY ("id")); COMMENT ON COLUMN "order_products"."id" IS 'Id of order_products table'; COMMENT ON COLUMN "order_products"."productId" IS 'Id product table'; COMMENT ON COLUMN "order_products"."orderId" IS 'Id orders table'`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "customerId" integer, "registerCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registerUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "pk_orders_id" PRIMARY KEY ("id")); COMMENT ON COLUMN "orders"."id" IS 'Id orders table'; COMMENT ON COLUMN "orders"."customerId" IS 'Primary key table'`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "fk_order_products_product" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "fk_order_products_order" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "fk_orders_customer" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "fk_orders_customer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "fk_order_products_order"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "fk_order_products_product"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order_products"`);
  }
}
