import React from "react";
import NavButton from "./NavButton";

const NavMenu = () => (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavButton name={"Login"} href="/login"/>
        </ul>
    </div>
)

export default NavMenu;