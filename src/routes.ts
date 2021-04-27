import { request, response, Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";
//import { getCustomRepository } from "typeorm";
//import { SettingsRepository } from "./repositories/SettingsRepository";


const routes = Router();

/**
 * TIPOS DE PARÂMETROS:
 * Routes Params => Parâmetros de rotas
 *      http://localhost:3333/settings/1
 * Query Params => Filtros e buscas
 *       http://localhost:3333/settings/1?search=algumacoisa
 * Body Params => quando passa objetos nas requisições, representrado por um json {}
 * 
 */




/*
routes.post("/settings", async (request, response) => {
    
    //const body = request.body;
    const { chat, username } = request.body;

    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({
        //body.chat
        //body.username
        chat,
        username
    })

    await settingsRepository.save(settings);

    return response.json(settings);   
})
*/


const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);
routes.post("/users", usersController.create);
routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

routes.get("/settings/:username", settingsController.findByUsername);

routes.put("/settings/:username", settingsController.update);

export { routes };
