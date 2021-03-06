import React from "react";
import { MDBListGroupItem } from "mdbreact";
import { useChatContext } from "../../utils/contexts/chatContext";
import "./index.css"

export default function Friend(props){
    const [state] = useChatContext();
    

    return (
        <MDBListGroupItem
            className={state.chattingWith === props.data.id ? "d-flex justify-content-between p-2 convoColor selected" : "d-flex justify-content-between p-2 convoColor" }
            onClick={() => props.getMessages(props.data.chatId, props.data.id, props.data.name)}
            
        >
            <img className="conversation-photo" src={props.data.avatar} alt="..." />
            {/*<MDBAvatar
                tag="img"
                src={avatar} props.data.photo
                alt="avatar"
                circle
                className="mr-2 z-depth-1"
            /> */}
            <div style={{ fontSize: "0.95rem" }}>
                <strong>{props.data.name}</strong>
            </div>
            {/*<div>
                <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                    {when}
                </p>
                {seen ? (
                    <span className="text-muted float-right">
                        <MDBIcon className="fa-check" aria-hidden="true" />
                    </span>
                ) : toRespond ? (
                    <MDBBadge color="danger" className="float-right">
                        {toRespond}
                    </MDBBadge>
                ) : (
                            <span className="text-muted float-right">
                                <MDBIcon icon="reply" aria-hidden="true" />
                            </span>
                        )}
                </div>*/}
        </MDBListGroupItem>
    );
}
