//This is for instant messaging funcitonality

module.exports = (app) => {

    // const chatServer = require('http').createServer(app);
    let io = require('socket.io')(app);
    const chatController = require("../controllers/chatController");
    require("dotenv").config();

    const PORT = 3002 || process.env.PORT;

    let connectedUsers = new Map(); //this is where we store connected users


    io.on('connection', (socket) => {

        socket.on("user_connect", (data) => { //when a client connects to the server

            connectedUsers.set(data, {
                sId: socket.id,
                uId: data
            });

            // console.log("Total Users Online", connectedUsers.size);
            socket.emit("user_connect", connectedUsers.get(data).sId);
        });

        socket.on("created_chat", (data) => { //when a client creates a chat with another user
            //get client who will recieve chat notification!
            let reciever = connectedUsers.get(data.joineeId);

            if (reciever === undefined) {
                // console.log("One user not online") this is useless
            }
            else {
                io.to(reciever.sId).emit("created_chat", { //have this feature either send if online, or instead just add chat notification in db?
                    creatorId: data.creatorId
                });
            }
        });

        socket.on("send_message", data => {
            let message = data.message;
            let sender = data.sender;
            let chatId = data.chatId;

            let reciever = data.reciever;
            let recSocket = connectedUsers.get(reciever);

            let chatData = {
                authorId: sender,
                message: message,
                ChatId: chatId
            }

            if (recSocket === undefined) {
                chatController.createMessage(chatData).then(createdMessage => {
                    socket.emit("call_send_message");
                });
            }
            else {
                socket.emit("call_send_message");

                chatController.createMessage(chatData).then(createdMessage => {
                    io.to(recSocket.sId).emit("recieve_message", chatId);
                });
            }
        });

        socket.on("disconnect", () => {
            connectedUsers.forEach(e => {
                if (e.sId == socket.id) {
                    connectedUsers.delete(e.uId);
                }
            });
        });
    });

    // chatServer.listen(PORT, () => {
    //     console.log("Chat server started 🖥");
    // });
}
