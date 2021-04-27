import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams{
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionServices = new ConnectionsService();
    const usersServices = new UsersService();
    const messagesServices = new MessagesService();

    let user_id = null;

    socket.on("client_first_access", async params => {
        //console.log(params);

        const socket_id = socket.id;

        const { text, email } = params as IParams;

        const userExists = await usersServices.findByEmail(email);

        if(!userExists){

            const user = await usersServices.create(email);

            await connectionServices.create({
            socket_id,
            user_id: user.id
        });

        user_id = user.id;

        } else{

            user_id = userExists.id;

            const connection = await connectionServices.findByUserId(userExists.id);

            if(!connection){
               await connectionServices.create({
                    socket_id,
                    user_id: userExists.id
                }); 
            } else {
                connection.socket_id = socket_id;
                await connectionServices.create(connection);
            }         
        }

        await messagesServices.create({
            text,
            user_id
        });

        const allMessages = await messagesServices.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages);

        const allUsers = await connectionServices.findAllWithoutAdmin();
        io.emit("admin_list_all_users", allUsers);
        
    });

    socket.on("client_send_to_admin", async (params) => {
        const { text, socket_admin_id } = params;

        const socket_id = socket.id;

        const { user_id } = await connectionServices.findBySocketId(socket_id);

        const message = await messagesServices.create({
            text,
            user_id
        });

        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        });

    })
})