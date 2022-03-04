import React, {useEffect} from "react";
import {
    Route,
    Routes
} from "react-router-dom";
import Login from "./login/login";
import Dashboard from "./dashboard/Dashboard";
import Register from "./register/Register";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addUser, removeUser} from "../redux/actions/userActions";
import UserDetails from "./user_details/UserDetails";
import CreateConversation from "./conversations/CreateConversation";
import Conversation from "./conversations/Conversation";
import MyConversations from "./conversations/MyConversations";

const Content = () => {

    const dispatcher = useDispatch()
    const user = useSelector(store => store.user);

    useEffect(() => {
        axios.get("/is_logged").then(({data}) => {
            if(!data.is_logged){
                dispatcher(removeUser());
            }
            else{
                if(user === null || user.name === undefined){
                    dispatcher(addUser({
                        name: data.name,
                        surname: data.surname,
                        username: data.username,
                        email: data.email,
                        avatar: data.avatar
                    }))
                }
            }
        }).catch((e) => {
            dispatcher(addUser({}))
        })
    }, [])

    return(
        <div className="d-flex justify-content-center content align-items-center">
            <Routes>
                <Route path="/" exact element={<Dashboard />}/>
                <Route path="/login" exact element={<Login />}/>
                <Route path="/users/new" exact element={<Register />}/>
                <Route path="/users" exact element={<UserDetails />}/>
                <Route path="/users/conversations" exact element={<MyConversations />}/>
                <Route path="/users/conversations/:id" element={<Conversation />}/>
                <Route path="/users/conversations/new" exact element={<CreateConversation />} />
            </Routes>
        </div>
    )
}

export default Content;