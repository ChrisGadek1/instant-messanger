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
                <Route path="/users/:id" exact element={<UserDetails />}/>
            </Routes>
        </div>
    )
}

export default Content;