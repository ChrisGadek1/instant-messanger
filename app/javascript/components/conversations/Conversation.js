import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addConversation} from "../../redux/actions/conversationsActions";
import {Card} from "react-bootstrap";
import Spinning from "../utils/Spinning";

const Conversation = () => {

    let { id } = useParams();
    const dispatcher = useDispatch();
    const conversations = useSelector(store => store.conversations);
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        if(!conversations.find(conv => conv.id.toString() === id)){
            axios.get(`/users/conversations/${id}/get_conversation`).then(({data}) => {
                dispatcher(addConversation({ conversation: data.conversation }));
                setConversation(data.conversation)
            }).catch((e) => {
                console.error(e);
            })
        }
    },[conversations])

    return(
        <>
            {conversation !== null ? <Card className="col-sm-10 col-md-8 col-lg-6 col-11">
                <Card.Header>
                    <div>
                        <img src={conversation.addressee.avatar} width="40px" height="40px" />
                        <h4 className="d-inline-block ms-3">{conversation.addressee.name} {conversation.addressee.surname}</h4>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div>
                        {conversation.messages.length === 0 ? <h5 className="text-center">There are no messages to display yet. Start your conversation and you will see messages here.</h5>: <div>
                        </div>}
                    </div>
                    <hr />
                    <div>
                        <textarea className="form-control" style={{backgroundColor: "#cfd7e3"}}></textarea>
                        <button className="btn btn-primary mt-3">Send</button>
                    </div>
                </Card.Body>
            </Card> : <Spinning />}
        </>
    )
}

export default Conversation;