import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const NavMobile = () => {

    const user = useSelector(store => store.user);

    return(
        <>
            <div>
                { user !== null && user.name !== undefined ?
                    <Link
                        className = "navbar-brand"
                        to = {"/"} >
                        <img src={user.avatar} width="35px" height="35px" />
                    < /Link> : null }
                <Link className="navbar-brand" to={"/"}>Messenger App</Link>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </>
        )

}

export default NavMobile;