import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1678268293159 implements MigrationInterface {
  name = 'createUsersTable1678268293159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (userId varchar(36) NOT NULL, email varchar(255) NOT NULL, profileImage varchar(255) NOT NULL DEFAULT '', lastName varchar(255) NOT NULL, firstName varchar(255) NOT NULL, phoneNumber varchar(255) NOT NULL DEFAULT '', address text NULL, facebook varchar(255) NOT NULL DEFAULT '', instagram varchar(255) NOT NULL DEFAULT '', password varchar(255) NOT NULL, oldPasswords text NOT NULL, status varchar(255) NOT NULL DEFAULT 'INACTIVE', teamId varchar(255) NULL, createdAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updatedAt timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX IDX_d1803064187c8f38e57a9c4984 (teamId), PRIMARY KEY (userId)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE users ADD CONSTRAINT FK_d1803064187c8f38e57a9c4984c FOREIGN KEY (teamId) REFERENCES teams(teamId) ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users DROP FOREIGN KEY FK_d1803064187c8f38e57a9c4984c`
    );
    await queryRunner.query(
      `DROP INDEX IDX_d1803064187c8f38e57a9c4984 ON users`
    );
    await queryRunner.query(`DROP TABLE users`);
  }
}
