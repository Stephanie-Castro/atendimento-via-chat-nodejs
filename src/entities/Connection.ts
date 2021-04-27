import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuid } from "uuid" //ao invés de usar v4, é melhor chamar de uuid, para ficar mais fácil de ler
import { User } from "./User";


@Entity("connections")//nome da tabela criada, que no caso é 'settings'
class Connection {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User) //muitas mensagens para um usuário, o da frente é a classe que estamos tratando, o do final é o atributo que estamos criando
    user: User;

    @Column()
    user_id: string;

    @Column()
    socket_id: string;

    @CreateDateColumn()
    created_At: Date;

    @UpdateDateColumn()
    updated_at: Date;


    constructor(){
        if(!this.id){ //se o id não estiver preenchido ...
            this.id = uuid(); //é gerado um uuid para o id.
        }
    }

}

export { Connection }