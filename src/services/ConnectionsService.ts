import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
    socket_id: string; 
    user_id: string;
    admin_id?: string; //admin_id é opcional, ele pode vir, como pode não vir, pois na hora que um user manda uma mensagem, pode ser que ainda não tenha um admin logado
    id?: string;

}

class ConnectionsService {

    private connectionsRepository: Repository<Connection>; //o private vai fazer com que só possa ser chamada dentro dessa classe

    constructor(){
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({socket_id, user_id, admin_id, id} : IConnectionCreate){

        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.connectionsRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string){
        const connection = await this.connectionsRepository.findOne({
            user_id
        });

        return connection;
    }

    async findAllWithoutAdmin(){
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"],
        });

        return connections;

    }

    async findBySocketId(socket_id: string) {

        const connection = await this.connectionsRepository.findOne({
            socket_id
        });

        return connection;

    }

    async updateAdminID(user_id: string, admin_id: string){
        await this.connectionsRepository.createQueryBuilder()
        .update(Connection)
        .set({ admin_id })
        .where("user_id = :user_id", { user_id })
        .execute();

    }

}

export { ConnectionsService }