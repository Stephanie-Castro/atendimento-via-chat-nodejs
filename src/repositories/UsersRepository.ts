import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User) //É um repositório do tipo 'User'
class UsersRepository extends Repository<User> { //A classe UsersRepository extends de Repository (de entidade User)

}

export { UsersRepository }