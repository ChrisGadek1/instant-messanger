import React from "react";
import NavMobile from "./NavMobile";
import NavMenu from "./NavMenu";

const Nav = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavMobile />
                <NavMenu />
            </div>
        </nav>
    )
}

export default Nav;