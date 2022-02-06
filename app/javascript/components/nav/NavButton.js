import React from "react";
import {Link} from "react-router-dom";

const NavButton = ({name, href, onClick}) => {
    return(
        <li className="nav-item ms-3" onClick={onClick}>
            <Link className="nav-link" role="button" to={href}>{name}</Link>
        </li>
    )
}

export default NavButton;