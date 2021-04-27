import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Messages";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
    admin_id?: string; //admin_id é opcional, ele pode vir, como pode não vir, pois na hora que um user manda uma mensagem, pode ser que ainda não tenha um admin logado
    text: string;
    user_id: string;
}

class MessagesService {

    private messagesRepository: Repository<Message>; //o private vai fazer com que só possa ser chamada dentro dessa classe

    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({admin_id, text, user_id} : IMessageCreate){

        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        })

        await this.messagesRepository.save(message);

        return message;
    }
    

    async listByUser(user_id: string){

        //select * from message where user_id = "user_id"
        const list = await this.messagesRepository.find({ //O método find retorna uma lista, enquanto o findOne só retorna um elemento
            where: { user_id },
            relations: [ "user" ] //passa exatamente o mesmo nome do atributo que foi usado no relacionamento ns entidade Messsage.ts
        });

        return list;
    }

}

export { MessagesService }