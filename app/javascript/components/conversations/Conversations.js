import {Card} from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import axios from "axios";
import React, {useState} from "react";
import SelectOneUser from "../select_users/SelectOneUser";

const Conversations = () => {

    const [selectedUser, setSelectedUser] = useState({});
    const handleSelectedUserChange = (user) => setSelectedUser(user);




    return(
        <Card className="col-sm-10 col-lg-6 col-md-8">
            <Card.Header>
                <h4>Conversations</h4>
            </Card.Header>
            <Card.Body>
                <p>Search for people to start private conversation</p>
                <SelectOneUser onChange={handleSelectedUserChange}/>
            </Card.Body>
        </Card>
    )
}

export default Conversations;