import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";

@EntityRepository(Connection) //É um repositório do tipo 'Message'
class ConnectionsRepository extends Repository<Connection> { //A classe SettingsRepository extends de Repository (de entidade Message)

}

export { ConnectionsRepository }