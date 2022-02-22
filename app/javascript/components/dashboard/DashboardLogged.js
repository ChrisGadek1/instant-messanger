import React from "react";
import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const DashboardLogged = () => {

    const user = useSelector(store => store.user)

    return(
        <Card className="logout border-primary col-10 col-lg-6">
            <Card.Header>
                <h4 className="text-center">Welcome {user.name} {user.surname}</h4>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center flex-wrap gap-3" >

                <div>
                    <img src={user.avatar} width="180px" height="180px"/>
                </div>
                <div>
                    <p>Now you can start to message your friends. If you are new to this application, you can
                    try to search your friends by their names or user name</p>
                    <hr />
                </div>
                <div>
                    <Link className="btn btn-primary" to="/conversations" >Go to Conversations</Link>
                </div>

            </Card.Body>
        </Card>
    )
}

export default DashboardLogged