import React from "react";
import {
    Route,
    Routes
} from "react-router-dom";
import Login from "./login/login";
import Dashboard from "./dashboard/Dashboard";

const Content = () => {
    return(
        <div className="d-flex justify-content-center content align-items-center">
            <Routes>
                <Route path="/" exact element={<Dashboard />}/>
                <Route path="/login" exact element={<Login />}/>
            </Routes>
        </div>
    )
}

export default Content;