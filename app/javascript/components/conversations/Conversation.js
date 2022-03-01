import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addConversation} from "../../redux/actions/conversationsActions";
import {Card} from "react-bootstrap";

const Conversation = () => {

    let { id } = useParams();
    const dispatcher = useDispatch();
    const conversations = useSelector(store => store.conversations);

    useEffect(() => {
        if(!conversations.find(conv => conv.id.toString() === id)){
            axios.get(`/users/conversations/${id}/get_conversation`).then(({data}) => {
                dispatcher(addConversation({ conversation: {id: data.conversation.id, messages: data.conversation.messages } }));
            }).catch((e) => {
                console.error(e);
            })
        }
    },[conversations])

    return(
        <Card>

        </Card>
    )
}

export default Conversation;