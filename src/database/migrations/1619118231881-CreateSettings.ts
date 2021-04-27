import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1619118231881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "settings",
                columns:[
                    {
                        name: "id",
                        type: "uuid", //uuid - Identificador Único Universal - é um número de 128 bits usado para identificar informações em sistemas de computação.
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar"
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()" //cria o registro com a data atual
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()" //cria o registro com a data atual
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings"); //apaga a tabela settings
    }

}
