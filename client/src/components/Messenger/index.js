import React, { useState, useEffect } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { useChatContext } from "../../utils/contexts/chatContext";
import API from "../../utils/API";

import './Messenger.css';

export default function Messenger(props) {

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [state, dispatch] = useChatContext();


  useEffect(() => {
    getConversations()
  },[])
  

  const getMessages = (chatId) => {
    API.getMessages(chatId).then(res => {

      let msgData = res.data;

      if(msgData.length == 0){
        setMessages([{
          id: 1,
          author: state.user.id,
          message: 'There are currently no Messages',
          timestamp: new Date().getTime()
        }])
      }
      else {
        setMessages(msgData);
      }
    })
  }

 const getConversations = () => {
   API.getChats(state.user.id).then(res => {

    let chats = res.data;
    let convoUsers = [];

    chats.forEach(chat => { //for every chat we have
      //get the user thats not us
      let userThatsNotMe = chat.Users.filter(user => user.id != state.user.id);
      
      //push a shortened object version of them to convoUsers
      convoUsers.push({
            id: userThatsNotMe[0].id,
            name: userThatsNotMe[0].userName,
            photo: userThatsNotMe[0].profileImage,
            chatId: userThatsNotMe[0].UserChats.ChatId
          });
    });
    setConversations(convoUsers);//set the convoUsers to state
   });
  }

  return (
    <div className="messenger">

      <Toolbar
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />

      <div className="scrollable sidebar">
        <ConversationList conversations={conversations} getMessages={getMessages}/>
      </div>

      <div className="scrollable content">
        <MessageList messages={messages} MY_USER_ID={state.user.id}/>
      </div>
    </div>
  );
}