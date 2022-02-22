import React from "react";
import {Link} from "react-router-dom";

const NavMobile = () => (
    <>
        <Link className="navbar-brand" to={"/"}>Messenger App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    </>
)

export default NavMobile;