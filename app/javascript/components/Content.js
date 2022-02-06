import React, {useEffect} from "react";
import {
    Route,
    Routes
} from "react-router-dom";
import Login from "./login/login";
import Dashboard from "./dashboard/Dashboard";
import Register from "./register/Register";
import axios from "axios";

const Content = () => {

    useEffect(() => {
        axios.get("/is_logged").then(({data}) => {

        })
    })

    return(
        <div className="d-flex justify-content-center content align-items-center">
            <Routes>
                <Route path="/" exact element={<Dashboard />}/>
                <Route path="/login" exact element={<Login />}/>
                <Route path="/users/new" exact element={<Register />}/>
            </Routes>
        </div>
    )
}

export default Content;