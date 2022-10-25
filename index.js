//Poco entiendo de todo esto
const express = require("express");

const db = require("./utils/database/db");

const indexRoutes = require("./api/index/index.routes");

const characterRoutes = require("./api/characters/characters.routes");

db.connectDb();

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: false})),

server.use("/", indexRoutes);
server.use("/characters", characterRoutes);

server.listen(PORT, () => {
    console.log(`Servidor a todo gas en http://localhost:${PORT}`);
});

