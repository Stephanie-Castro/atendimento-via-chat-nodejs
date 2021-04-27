import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuid } from "uuid" //ao invés de usar v4, é melhor chamar de uuid, para ficar mais fácil de ler


@Entity("settings")//nome da tabela criada, que no caso é 'settings'
class Setting {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_At: Date;


    constructor(){
        if(!this.id){ //se o id não estiver preenchido ...
            this.id = uuid(); //é gerado um uuid para o id.
        }
    }

}

export { Setting }