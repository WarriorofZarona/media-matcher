import React, { createContext, useReducer, useContext } from "react";
import io from "socket.io-client";
import chatActions from "./chatActions";
import API from "../API";
require("dotenv").config();

const ChatContext = createContext();
const { Provider } = ChatContext;
const URL = "https://ancient-dusk-51587.herokuapp.com/"

let socket;

const reducer = (state, action) => {
    switch (action.type) {
        case (chatActions.LOAD_IO):
            loadSocket(state);
            return { ...state }
        case (chatActions.CREATE_CHAT):
            console.log("Create Chat with " + action.creatorId + " and " + action.joineeId);
            createChat(action.creatorId, action.joineeId);
            return { ...state }
        case (chatActions.SELECT_USER):
            return { ...state, chattingWith: action.id, currentChat: action.chatId, messages: action.messages }
        case (chatActions.SEND_MESSAGE):
            sendMessage(state, action.message);
            return { ...state }
        case (chatActions.RESET):
            return { ...state, chattingWith: 0, currentChat: action.chatId, messages: [] }
        case (chatActions.UPDATE_MSG):
            return { ...state, messages: action.messages }
        case ("reload"):
            return { ...state, messages: action.msg }
        default:
            throw new Error(`invalid action type: ${action.type}`);
    }
}

const ChatProvider = ({ userObj = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, { user: userObj, chattingWith: 0, currentChat: 0, messages: [], getMessages: {} });

    if (props.startChat) {
        loadSocket(state, dispatch);
    }

    return <Provider value={[state, dispatch]} {...props} />;
}

const useChatContext = () => {
    return useContext(ChatContext);
}

function createChat(creatorId, joineeId) {
    let data = {
        creatorId: creatorId,
        joineeId: joineeId
    }

    API.createChat(data);

    socket.emit("created_chat", {
        creatorId: creatorId,
        joineeId: joineeId
    });
}


function loadSocket(state, dispatch) { //connects to socket on server whoo!

    socket = io.connect(URL);

    socket.emit("user_connect", state.user.id);

    socket.on("user_connect", (data) => { //Listen from server
        //   console.log("Connected to Chat Server with Id of ", data);
    });

    socket.on("created_chat", data => { //Listen from server
        // console.log(`user with id ${data.creatorId} wants to chat!`);
    });

    socket.on("recieve_message", incomingChatId => {
        grabMsgFromAPI(incomingChatId, dispatch);
    });

    socket.on("call_send_message", data => {
        grabMsgFromAPI(state.currentChat, dispatch);
    });
}


function sendMessage(state, message) {

    let outGoingMsg = {
        sender: state.user.id,
        chatId: state.currentChat,
        message: message,
        reciever: state.chattingWith
    }

    state.messages.push({
        authorId: state.user.id,
        message: message
    });

    socket.emit("send_message", outGoingMsg);
}

function grabMsgFromAPI(chatId, dispatch) {
    API.getMessages(chatId).then(res => {
        dispatch({ type: "reload", msg: res.data })
    });
}

export { ChatProvider, useChatContext };