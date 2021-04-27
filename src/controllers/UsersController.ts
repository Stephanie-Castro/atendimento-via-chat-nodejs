import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {

    async create(request: Request, response: Response): Promise<Response>{ //Promise<Response> é o retorno da função

        const { email } = request.body;
        
        const usersService = new UsersService();

        const users = await usersService.create(email);

        return response.json(users); //É o retorno da função

    }
}

export { UsersController }