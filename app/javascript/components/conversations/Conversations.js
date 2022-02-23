import React from "react";
import {Card} from "react-bootstrap";
import Select from 'react-select';

const Conversations = () => {

    return(
        <Card className="col-sm-10 col-lg-6 col-md-8">
            <Card.Header>
                <h4>Conversations</h4>
            </Card.Header>
            <Card.Body>
                <p>Search for people to start private conversation</p>
                <Select>

                </Select>
            </Card.Body>
        </Card>
    )
}

export default Conversations;