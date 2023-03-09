import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreatedByInTeamsTable1678269186313
  implements MigrationInterface
{
  name = "addCreatedByInTeamsTable1678269186313";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE teams ADD createdBy varchar(255) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE teams ADD CONSTRAINT FK_914ec34a697732321ba2fb83a99 FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE teams DROP FOREIGN KEY FK_914ec34a697732321ba2fb83a99`
    );
    await queryRunner.query(`ALTER TABLE teams DROP COLUMN createdBy`);
  }
}
