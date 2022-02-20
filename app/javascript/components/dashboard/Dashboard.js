import React, {useState} from "react";
import DashboardNotLogged from "./DashboardNotLogged";
import {useSelector} from "react-redux";
import DashboardLogged from "./DashboardLogged";
import Spinning from "../utils/Spinning";

const Dashboard = () => {
    const user = useSelector(store => store.user);
    const dashboard = user !== null ? (user.name !== undefined ? <DashboardLogged/> : <DashboardNotLogged/>): <Spinning />

    return(
        <>
            {dashboard}
        </>

    )
}

export default Dashboard;