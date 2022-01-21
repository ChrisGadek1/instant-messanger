import React from "react";

const NavButton = ({name}) => {
    return(
        <li className="nav-item ms-3">
            <a className="nav-link" role="button">{name}</a>
        </li>
    )
}

export default NavButton;