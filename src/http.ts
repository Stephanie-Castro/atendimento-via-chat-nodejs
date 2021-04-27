import express, { response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";


import "./database" //reconhece que o que quer ser importado é o arquivo index.ts
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
});

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html");
});

const http = createServer(app); //criando protocolo http
const io = new Server(http); //criando protocolo ws (WebSocket)

io.on("connection", (socket: Socket) => {
    console.log("Se conectou " + socket.id);
})


/**
 * GET - buscas
 * POST - Criação
 * PUT - Alteração
 * DELETE - deletar
 * PATCH - alterar uma informação específica
 * 
 */

/*
app.get("/", (request, response) => {
    //return response.send("Hello World!");
    return response.json(
        {
            message_english: "Hello World",
            message_portuguese: "Olá, Mundo!",
        }
    )
})

app.post("/rota-post", (request, response) => {
    //return response.send("Hello World!");
    return response.json(
        {
            post_example_english: "Post Example",
            post_example_portuguese: "Exemplo Post",
        }
    )
})
*/

app.use(express.json());
app.use(routes);

export { http, io }