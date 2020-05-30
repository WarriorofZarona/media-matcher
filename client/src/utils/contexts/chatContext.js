import React, { createContext, useReducer, useContext } from "react";
import io from "socket.io";
import chatActions from "./chatActions";
import API from "../API";

const ChatContext = createContext();
const { Provider } = ChatContext;

const reducer = (state, action) => {
    switch(action.type){
        case(chatActions.CREATE_CHAT):
            console.log("Create Chat with " + action.userId);
            createChat(1,2);
            break;
        case(chatActions.SEND_CHAT):
            console.log("Send chat!");
            break;
        case(chatActions.GET_CHATS):
            console.log("Get chats!");
            break;
        default:
            throw new Error(`invalid action type: ${action.type}`);
    }
}

const ChatProvider = ({ userObj = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, { user: userObj });

    return <Provider value={[state, dispatch]} {...props} />;
}

const useChatContext = () => {
    return useContext(ChatContext);
}

function createChat(user1,user2){
    let data = {
        user1: user1,
        user2: user2
    }

    API.createChat(data);
}


function loadSocket(){ //boiler plate code for now
    const socket = io.connect('http://localhost:3002');
    socket.on('news', (data) => {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
}

export { ChatProvider, useChatContext };