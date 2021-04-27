import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {

    private usersRepository: Repository<User>; //o private vai fazer com que só possa ser chamada dentro dessa classe

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string){

        //Verificar se usuario existe
        const userAlreadyExists = await this.usersRepository.findOne({email}); //select * from settings where username = 'username' limit 1 (retorna só um resultado, o primeiro)

        //Se existir, retornar user
        if(userAlreadyExists){
            return userAlreadyExists;
        };

        //Se não existir, salvar no BD
        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        return user;
    }

    async findByEmail(email: string){
        //Verificar se usuario existe
        const userAlreadyExists = await this.usersRepository.findOne({email}); //select * from settings where username = 'username' limit 1 (retorna só um resultado, o primeiro)
        return userAlreadyExists;
    }

}

export { UsersService }