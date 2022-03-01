import {Card} from "react-bootstrap";
import React, {useState} from "react";
import SelectUser from "../select_users/SelectUser";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addConversation} from "../../redux/actions/conversationsActions";
import {useNavigate} from "react-router-dom";

const CreateConversation = () => {

    const dispatcher = useDispatch();
    const conversations = useSelector(store => store.conversations)
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useState({});
    const handleSelectedUserChange = (option) => {
        setSelectedUser(option.value);
    }

    const [selectedUsers, setSelectedUsers] = useState([]);
    const handleSelectedUsersChange = (users) => setSelectedUsers(users);

    const [avatars, setAvatars] = useState([]);
    const handleAvatarsChange = (e) => setAvatars([...e.target.files])

    const [conversationName, setConversationName] = useState("");
    const handleChangeConversationName = (e) => setConversationName(e.target.value);

    const handleGoToPrivateConversation = () => {
        let formData = new FormData();
        formData.append("title", `${selectedUser.name} ${selectedUser.surname} (@${selectedUser.username})`)
        formData.append("username", selectedUser.username);
        formData.append("isPrivate", "true");
        formData.append("authenticity_token", document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : "")
        axios.post("/users/conversations", formData).then(({data}) => {
            console.log( { conversation: { id: data.conversation.id, messages: data.conversation.messages}} )
            if(conversations.find(conv => conv.id === data.conversation.id) === undefined){
                dispatcher(addConversation({ conversation: data.conversation } ))
            }
            navigate(`/users/conversations/${data.conversation.id}`);
        }).catch(e => {
            console.log(e);
        })
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