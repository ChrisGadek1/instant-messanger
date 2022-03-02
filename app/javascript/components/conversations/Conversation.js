import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addConversation} from "../../redux/actions/conversationsActions";
import {Card} from "react-bootstrap";
import Spinning from "../utils/Spinning";

const Conversation = () => {

    let { id } = useParams();
    const currentUser = useSelector(store => store.user)
    const dispatcher = useDispatch();
    const conversations = useSelector(store => store.conversations);
    const [conversation, setConversation] = useState(null);
    const [secondUser, setSecondUser] = useState(null);

    const [newMessage, setNewMessage] = useState("");
    const handleSetNewMessage = (e) => setNewMessage(e.target.value);

    const handleSendNewMessage = () => {
        axios.post(`/users/conversations/${id}/messages`,{
            text: newMessage,
            addressee: conversation.addressee.id,
            authenticity_token: document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : ""
        }).then(({data}) => {
            console.log(data);
        }).catch((e) => {
            console.error(e);
        })
    }

    useEffect(() => {
        console.log(conversations)
        console.log(id)
        if(!conversations.find(conv => conv.id.toString() === id)){
            axios.get(`/users/conversations/${id}/get_conversation`).then(({data}) => {
                const conversation = data.conversation
                conversation["messages"] = data.messages
                dispatcher(addConversation({ conversation }));
                setConversation(conversation)
                if(conversation.is_private && currentUser !== null){
                    const tmpSecondUser = data.users.find(user => user.username !== currentUser.username)
                    if(tmpSecondUser === undefined){
                        setSecondUser(currentUser)
                    }
                    else{
                        setSecondUser(tmpSecondUser)
                    }

                }
            }).catch((e) => {
                console.error(e);
            })
        }
    },[conversations, currentUser])

    return(
        <>
            {conversation !== null ? <Card className="col-sm-10 col-md-8 col-lg-6 col-11">
                <Card.Header>
                    <div>
                        <img src={ secondUser ? secondUser.avatar : conversation.avatar } width="40px" height="40px" />
                        <h4 className="d-inline-block ms-3">{ secondUser ? `${secondUser.name} ${secondUser.surname}` : `${conversation.title}` }</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div>
                        {conversation.messages.length === 0 ? <h5 className="text-center">There are no messages to display yet. Start your conversation and you will see messages here.</h5>: <div>
                        </div>}
                    </div>
                    <hr />
                    <div>
                        <textarea className="form-control" style={{backgroundColor: "#cfd7e3"}} value={newMessage} onChange={handleSetNewMessage}></textarea>
                        <button className="btn btn-primary mt-3" onClick={handleSendNewMessage}>Send</button>
                    </div>
                </Card.Body>
            </Card> : <Spinning />}
        </>
    )
}

export default Conversation;