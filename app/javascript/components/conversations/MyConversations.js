import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {addConversations} from "../../redux/actions/conversationsActions";

const MyConversations = () => {

    const conversations = useSelector(store => store.conversations)
    const dispatcher = useDispatch();
    const [notFetch, setNotFetch] = useState(false);

    useEffect(() => {
        if(!notFetch){
            axios.get("/users/conversation/get_all_conversations").then(({data}) => {
                const conversationsToAdd = [];
                data.conversations.forEach(conversation => {
                    if(!conversations.find(conv => conv.data.id === conversation.data.id)){
                        conversationsToAdd.push(conversation);
                    }
                })
                if(conversationsToAdd.length > 0){
                    setNotFetch(true);
                    dispatcher(addConversations({conversations: conversationsToAdd}))
                }
            }).catch((e) => {
                console.error(e)
            })
        }

    }, [conversations])

    return(
        <div>
            {conversations.map(conv => <div key={conv.data.id+"asdasd"}>{conv.data.id}</div>)}
        </div>
    )
}

export default MyConversations;