import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMembershipCodeColumnToDelegate1580995734510 implements MigrationInterface {
    name = 'AddMembershipCodeColumnToDelegate1580995734510'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `delegate` ADD `membershipCode` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `delegate` DROP COLUMN `membershipCode`", undefined);
    }

}
