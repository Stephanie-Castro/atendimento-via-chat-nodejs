import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnections1619293579228 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "connections",
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
                        //FK
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "socket_id",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()" //cria o registro com a data atual
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()" //cria o registro com a data atual
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                name: "FKConnectionUser",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL", //O que será feito quando o id de dentro da tabela de usuários que está sendo referenciado nessa tabela de messages, for removido
                onUpdate: "SET NULL"
            })
        )
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("connections", "FKConnectionUser");
        await queryRunner.dropTable("connections"); //apaga a tabela connections
    }

}
