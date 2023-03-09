import { MigrationInterface, QueryRunner } from "typeorm";

export class createTeamsTable1678267964600 implements MigrationInterface {
  name = "createTeamsTable1678267964600";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE teams (teamId varchar(36) NOT NULL, name varchar(255) NOT NULL, status varchar(255) NOT NULL DEFAULT 'ACTIVE', createdAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX IDX_48c0c32e6247a2de155baeaf98 (name), PRIMARY KEY (teamId)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IDX_48c0c32e6247a2de155baeaf98 ON users`
    );
    await queryRunner.query(`DROP TABLE teams`);
  }
}
