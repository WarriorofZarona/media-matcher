const isAuthenticated = require("../config/middleware/isAuthenticated");
const sequelize = require("sequelize");


module.exports = (server, db) => {

    //create routes here to manage chat db

    server.get("/chats", (req, res) => {
        let id = req.body.id;
    });


}