import { MigrationInterface, QueryRunner } from "typeorm";

export class createPermissionsTable1678268518574 implements MigrationInterface {
  name = "createPermissionsTable1678268518574";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE permissions (id varchar(36) NOT NULL, currentUserId varchar(255) NOT NULL, roleName varchar(255) NOT NULL, commission int NOT NULL, trainerUserId varchar(255) NULL, teamId varchar(255) NULL, status varchar(255) NOT NULL DEFAULT 'PENDING', createdAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX IDX_8ad3009d978865572764686cd0 (teamId), PRIMARY KEY (id)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE permissions ADD CONSTRAINT FK_4eea28483bc179ba510555c5506 FOREIGN KEY (currentUserId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE permissions ADD CONSTRAINT FK_ceeddbdfd64686273192ff4e33b FOREIGN KEY (trainerUserId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE permissions ADD CONSTRAINT FK_8ad3009d978865572764686cd03 FOREIGN KEY (teamId) REFERENCES teams(teamId) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE permissions DROP FOREIGN KEY FK_8ad3009d978865572764686cd03`
    );
    await queryRunner.query(
      `ALTER TABLE permissions DROP FOREIGN KEY FK_ceeddbdfd64686273192ff4e33b`
    );
    await queryRunner.query(
      `ALTER TABLE permissions DROP FOREIGN KEY FK_4eea28483bc179ba510555c5506`
    );
    await queryRunner.query(
      `DROP INDEX IDX_8ad3009d978865572764686cd0 ON permissions`
    );
    await queryRunner.query(`DROP TABLE permissions`);
  }
}
