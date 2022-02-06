import React, {useState} from "react";
import DashboardNotLogged from "./DashboardNotLogged";
import {useSelector} from "react-redux";
import DashboardLogged from "./DashboardLogged";

const Dashboard = () => {
    const user = useSelector(store => store.user);
    const dashboard = user !== null ? (user.name !== undefined ? <DashboardLogged/> : <DashboardNotLogged/>): <div className="spinner-border m-4 col-4" role="status"></div>

    return(
        <>
            {dashboard}
        </>

    )
}

export default Dashboard;