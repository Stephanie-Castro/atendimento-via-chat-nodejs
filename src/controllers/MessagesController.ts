import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

class MessagesController {

    async create(request: Request, response: Response): Promise<Response>{ //Promise<Response> é o retorno da função

        const { admin_id, text, user_id } = request.body;
        
        const messagesService = new MessagesService();

        const message = await messagesService.create({
            admin_id,
            text,
            user_id
        });

        return response.json(message); //É o retorno da função
    }

    async showByUser(request: Request, response: Response){
        const { id } = request.params; //localhost:3333/idDoUsuario     //é pelo params, não pelo body

        const messagesService = new MessagesService();

        const list = await messagesService.listByUser(id);

        return response.json(list); //É o retorno da função
    }
}

export { MessagesController }