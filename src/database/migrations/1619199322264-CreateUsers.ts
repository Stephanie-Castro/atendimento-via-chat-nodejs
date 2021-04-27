import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1619199322264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "users",
                columns:[
                    {
                        name: "id",
                        type: "uuid", //uuid - Identificador Único Universal - é um número de 128 bits usado para identificar informações em sistemas de computação.
                        isPrimary: true
                    },
                    {
                        name: "email",
                        type: "varchar"
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
        await queryRunner.dropTable("users"); //apaga a tabela users
    }

}
