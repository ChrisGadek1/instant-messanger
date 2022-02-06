import React from "react";
import NavButton from "./NavButton";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {removeUser} from "../../redux/actions/userActions";

const NavMenu = () => {

    const user = useSelector(store => store.user);
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post("/logout", {authenticity_token: document.querySelector("meta[name=csrf-token]").content}).then(({data}) => {
            dispatcher(removeUser());
            navigate("/");
        })
    }

    return(
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                { user === null || user.name === undefined ? <NavButton name={"Login"} href="/login" onClick={null}/> : <NavButton name={"Logout"} onClick={handleLogout} href="#"/> }
            </ul>
        </div>
    )

}

export default NavMenu;