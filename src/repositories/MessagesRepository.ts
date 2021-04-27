import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/Messages";

@EntityRepository(Message) //É um repositório do tipo 'Message'
class MessagesRepository extends Repository<Message> { //A classe SettingsRepository extends de Repository (de entidade Message)

}

export { MessagesRepository }