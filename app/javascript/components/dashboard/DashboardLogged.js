import React from "react";

const DashboardLogged = ({name, surname}) => {
    return(
        <div className="card logout border-primary col-8">
            <div className="card-body">
                <h5 className="card-title">Welcome {name} {surname}</h5>
                <p className="card-text">asdasd</p>
            </div>
        </div>
    )
}

export default DashboardLogged