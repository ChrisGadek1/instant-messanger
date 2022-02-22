import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {addUser} from "../../redux/actions/userActions";
import ErrorModal from "../modals/ErrorModal";
import {validateFromApi, validateName} from "../../validators/UserValidators";

const UserDetails = () => {

    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatars, setAvatars] = useState([]);

    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    const handleNameChange = (e) => setName(e.target.value);
    const handleSurnameChange = (e) => setSurname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleAvatarsChange = (e) => setAvatars([...e.target.files])

    const updateUser = (newUser) => {
        axios.put(`/users/${newUser.username}`, {
            username: newUser.username,
            name: newUser.name,
            surname: newUser.surname,
            email: newUser.email,
            authenticity_token: document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : ""
        }).then(({data}) => {
            dispatcher(addUser(newUser))
        }).catch((e) => {
            setError(e.response.data.message);
            setShow(true);
        })
    }

    const handleSubmitNameChange = (e) => {
        e.preventDefault();
        setNameError(validateName(name, "name"));
        if(validateName(name) === ""){
            updateUser({name, surname: user.surname, email: user.email, username: user.username, avatar: user.avatar})
        }
    }

    const handleSubmitSurnameChange = (e) => {
        e.preventDefault();
        setSurnameError(validateName(surname, "surname"));
        if(validateName(surname) === ""){
            updateUser({name: user.name, surname, email: user.email, username: user.username, avatar: user.avatar})
        }
    }

    const handleSubmitUsernameChange = async (e) => {
        e.preventDefault();
        let localUsernameError = "";
        try{
            localUsernameError = await validateFromApi(username, "username", "/users/get_by_username", "isTaken", false)
            setUsernameError(localUsernameError);
        }
        catch (e){
            console.log(e);
            setUsernameError(e);
        }
        if(localUsernameError === ""){
            updateUser({name: user.name, surname: user.surname, username, email: user.email, avatar: user.avatar})
        }
    }

    const handleSubmitEmailChange = async (e) => {
        e.preventDefault();
        let localEmailError = "";
        try{
            localEmailError = await validateFromApi(email, "email", "/users/get_by_email", "isTaken", true);
            setEmailError(localEmailError);
        }
        catch (e){
            setEmailError(e);
        }
        if(localEmailError === ""){
            updateUser({name: user.name, surname: user.surname, username: user.username, email, avatar: user.avatar})
        }
    }

    const handleSubmitAvatarChange = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("image", avatars[0]);
        formData.append("authenticity_token", document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : "")
        axios.post("/users/:user_id/attach_avatar", formData).then(({data}) => {
            dispatcher(addUser({name: user.name, surname: user.surname, username: user.username, email: user.email, avatar: data.url}))
        });
    }

    const handleSubmitAvatarRemove = (e) => {
        e.preventDefault();
        axios.delete(`/users/${user.username}/remove_avatar`, {
            data: {
                authenticity_token: document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : ""
            }
        }).then(({data}) => {
            dispatcher(addUser({name: user.name, surname: user.surname, email: user.email, username: user.username, avatar: data.url}))
        }).catch((e) => {
            setError(e.response.data.message);
            setShow(true);
        })
    }

    useEffect(() => {
        if(user === null){

        }
        else if(user.name === undefined){
            navigate("/");
        }
        else{
            setName(user.name);
            setSurname(user.surname)
            setUsername(user.username)
            setEmail(user.email)
        }
    }, [user])

    const hideModal = () => {
        setShow(false);
    }

    return(
        <>
            {show ? <ErrorModal error={error} click={hideModal}  show={show}/> : null }
            <Card className="col-lg-6 col-sm-10">
                <Card.Header>
                    <Card.Title>My Account</Card.Title>
                </Card.Header>
                <Card.Body>
                    <form id="name-change-form" className="mb-5" onSubmit={handleSubmitNameChange}>
                        <label>
                            Name
                            <input className="form-control col-5 m-1" type="text" value={name} onChange={handleNameChange}/>
                        </label>
                        <input id="submit-name-change" type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                        <p className="small alert-danger">{nameError}</p>
                    </form>

                    <form id="surname-change-form" className="mb-5" onSubmit={handleSubmitSurnameChange}>
                        <label>
                            Surname
                            <input className="form-control col-5" type="text" value={surname} onChange={handleSurnameChange}/>
                        </label>
                        <input type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                        <p className="small alert-danger">{surnameError}</p>
                    </form>
                    <form id="username-change-form" className="mb-5" onSubmit={handleSubmitUsernameChange}>
                        <label>
                            username
                            <input className="form-control col-5" type="text" value={username} onChange={handleUsernameChange}/>
                        </label>
                        <input type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                        <p className="small alert-danger">{usernameError}</p>
                    </form>
                    <form id="email-change-form" className="mb-5" onSubmit={handleSubmitEmailChange}>
                        <label>
                            email
                            <input className="form-control col-5" type="email" value={email} onChange={handleEmailChange}/>
                        </label>
                        <input type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                        <p className="small alert-danger">{emailError}</p>
                    </form>
                    <form className="mb-1" onSubmit={handleSubmitAvatarChange}>
                        <label>
                            avatar
                            <input accept="image/*" className="form-control col-5" type="file" onChange={handleAvatarsChange}/>
                        </label>
                        <input type="submit" className="btn btn-outline-primary ms-2" value="Upload"/>
                    </form>
                    <form className="mb-5" onSubmit={handleSubmitAvatarRemove}>
                        <input type="submit" className="btn btn-outline-danger" value="Remove Avatar"/>
                    </form>
                    { user !== null ?
                        <div style={{width: "224px", padding: "10px", border: "2px solid black"}}>
                            <img src={user.avatar} width="200px" height="200px" />
                        </div>

                        : null }
                </Card.Body>
            </Card>
        </>

    )
}

export default UserDetails;