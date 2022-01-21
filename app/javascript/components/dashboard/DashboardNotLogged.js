import React from "react";

const DashboardNotLogged = () => {
    return(
        <div className="card logout border-primary col-8">
            <div className="card-img-top welcome-image"></div>
            <div className="card-body">
                <h5 className="card-title">Welcome to the Messenger App!</h5>
                <p className="card-text">To begin, please sign in or create account if you don't have it yet</p>
            </div>
        </div>
    )
}

export default DashboardNotLogged;