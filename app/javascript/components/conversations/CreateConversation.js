import {Card} from "react-bootstrap";
import React, {useState} from "react";
import SelectUser from "../select_users/SelectUser";

const CreateConversation = () => {

    const [selectedUser, setSelectedUser] = useState({});
    const handleSelectedUserChange = (user) => setSelectedUser(user);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const handleSelectedUsersChange = (users) => setSelectedUsers(users);

    const [avatars, setAvatars] = useState([]);
    const handleAvatarsChange = (e) => setAvatars([...e.target.files])

    const [conversationName, setConversationName] = useState("");
    const handleChangeConversationName = (e) => setConversationName(e.target.value);

    const handleGoToPrivateConversation = () => {

    }

    return(
        <Card className= "col-10 col-sm-10 col-lg-6 col-md-8">
            <Card.Header>
                <h4>New Conversation</h4>
            </Card.Header>
            <Card.Body>
                <h5>Create Private Conversation</h5>
                <p>Search for people to start private conversation</p>
                <SelectUser onChange={handleSelectedUserChange} isMulti={false}/>
                <div className="d-flex justify-content-center mb-3 mt-3 flex-wrap">
                    <button className="btn btn-primary m-3" onClick={handleGoToPrivateConversation}>Go To Private Conversation</button>
                </div>
                <hr />
                <h5>Create Public Conversation</h5>
                <p>Search for people to add them to the public conversation</p>
                <SelectUser onChange={handleSelectedUsersChange} isMulti={true} />
                <p className="mt-4">Enter The Name of Conversation</p>
                <input className="form-control col-5" type="text"/>
                <p className="mt-4">Choose Avatar (Optional)</p>
                <input accept="image/*" className="form-control col-5 mb-3" type="file" onChange={handleAvatarsChange}/>
                { avatars.length !== 0 ?
                    <div style={{width: "224px", padding: "10px", border: "2px solid black"}}>
                        <img src={URL.createObjectURL(avatars[0])} width="200px" height="200px" />
                    </div>

                    : null }
                <div className="d-flex justify-content-center mb-3 mt-3 flex-wrap">
                    <button className="btn btn-secondary m-3">Create Group Conversation</button>
                </div>

            </Card.Body>
        </Card>
    )
}

export default CreateConversation;