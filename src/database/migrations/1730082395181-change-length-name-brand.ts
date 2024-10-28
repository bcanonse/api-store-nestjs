import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeLengthNameBrand1730082395181
  implements MigrationInterface
{
  name = 'ChangeLengthNameBrand1730082395181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `ALTER TABLE "brands" DROP CONSTRAINT "uq_brands_name"`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "brands" DROP COLUMN "name"`,
    // );
    await queryRunner.query(
      `ALTER TABLE "brands" ALTER COLUMN "name" TYPE varchar(230)`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE "brands" ADD CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name")`,
    // );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands" ALTER COLUMN "name" TYPE varchar(255)`,
    );
  }
}
