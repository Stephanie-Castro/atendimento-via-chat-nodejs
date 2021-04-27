import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting) //É um repositório do tipo 'Setting'
class SettingsRepository extends Repository<Setting> { //A classe SettingsRepository extends de Repository (de entidade Setting)

}

export { SettingsRepository }