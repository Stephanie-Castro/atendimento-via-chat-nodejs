import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619204228378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "messages",
                columns:[
                    {
                        name: "id",
                        type: "uuid", //uuid - Identificador Único Universal - é um número de 128 bits usado para identificar informações em sistemas de computação.
                        isPrimary: true
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable: true //pode ser que ainda não tenha um admin atrelado ao usuário, quando esse usuário enviar a mensagem
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "text",
                        type: "varchar"
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()" //cria o registro com a data atual
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL", //O que será feito quando o id de dentro da tabela de usuários que está sendo referenciado nessa tabela de messages, for removido
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages"); //apaga a tabela users
    }

}
