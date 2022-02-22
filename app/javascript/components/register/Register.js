import React, {useEffect, useState} from "react";
import axios from "axios";
import RegisterModal from "../modals/RegisterModal";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../redux/actions/userActions";
import {
    validateName,
    validateFromApi,
    validatePassword,
    validateRepeatPassword
} from "../../validators/UserValidators";

const Register = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const user = useSelector(store => store.user);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState([]);
    const handleAvatarChange = (e) => setAvatar([...e.target.files])

    const [showDialog, setShowDialog] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");


    const handleNameChange = (e) => setName(e.target.value);
    const handleSurnameChange = (e) => setSurname(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);



    useEffect(() => {
        if(user !== null && user.name !== undefined){
            navigate("/");
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError(validateName(name, "name"));
        setSurnameError(validateName(surname, "surname"));
        setPasswordError(validatePassword(password));
        setRepeatedPasswordError(validateRepeatPassword(password,repeatPassword));
        setShowSpinner(true);
        let emailError = ""
        try{
            emailError = await validateFromApi(email, "email", "/users/get_by_email", "isTaken", true);
            setEmailError(emailError);
        }
        catch (e){
            setEmailError(e);
            setShowSpinner(false);
        }
        let usernameError = ""
        try{
            usernameError = await validateFromApi(username, "username", "/users/get_by_username", "isTaken", false)
            setUsernameError(usernameError);
        }
        catch (e){
            setUsernameError(e);
            setShowSpinner(false);
        }
        if(validateName(name, "name") === "" && validateName(surname, "surname") === "" && validatePassword(password) === "" && validateRepeatPassword(password, repeatPassword) === "" && emailError === "" && usernameError === ""){
            let formData = new FormData();
            formData.append("name", name);
            formData.append("surname", surname)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("username", username)
            formData.append("avatar", avatar.length === 0 ? null : avatar[0])
            formData.append("authenticity_token", document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : "")
            axios.post("/users", formData).then(({data}) => {
                setShowDialog(true)
                setShowSpinner(false);
            }).catch(e => {
                setShowSpinner(false);
            })
        }
        else{
            setShowSpinner(false);
        }

    }

    const backToLogin = () => {
        setShowDialog(false)
        navigate("/login")
    }

    const login = ({name, surname, username, email}) => {
        axios({
            method: "POST",
            url: '/login',
            data:{
                authenticity_token: document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : "",
                email,
                password
            },
            headers: {
                'Content-Type': 'application/json'}
        }).then(({data}) => {
            dispatcher(addUser({
                name,
                surname,
                username,
                email,
                avatar: data.avatar
            }))
            setShowDialog(false)
            navigate("/");
        }).catch(e => {
            console.error(e);
            setShowDialog(false)
        })
    }

    return(
        <>
            { showDialog ? <RegisterModal show={showDialog} login={() => login({name, surname, username, email})} backToLogin={backToLogin} /> : null}
            <div className="card col-10 col-lg-4 p-4 mt-3 mb-3">
                <h5 className="card-title">Register</h5>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <label className="row mb-3">
                            Name
                            <input name="name" className="form-control" type="text" value={name} onChange={handleNameChange}/>
                            <p className="small alert-danger">{nameError}</p>
                        </label>
                        <label className="row mb-3">
                            Surname
                            <input name="surname" className="form-control" type="text" value={surname} onChange={handleSurnameChange}/>
                            <p className="small alert-danger">{surnameError}</p>
                        </label>
                        <label className="row mb-3">
                            Username
                            <input name="username" className="form-control" type="text" value={username} onChange={handleUsernameChange}/>
                            <p className="small alert-danger">{usernameError}</p>
                        </label>
                        <label className="row mb-3">
                            Email
                            <input name="email" className="form-control" type="email" value={email} onChange={handleEmailChange}/>
                            <p className="small alert-danger">{emailError}</p>
                        </label>
                        <label className="row mb-3">
                            Password
                            <input name="password" className="form-control" type="password" value={password} onChange={handlePasswordChange}/>
                            <p className="small alert-danger">{passwordError}</p>
                        </label>
                        <label className="row mb-3">
                            Repeat Password
                            <input id="register-repeated-password" className="form-control" type="password" value={repeatPassword} onChange={handleRepeatPasswordChange}/>
                            <p className="small alert-danger">{repeatedPasswordError}</p>
                        </label>
                        <label>
                            Avatar (Optional)
                            <input accept="image/*" className="form-control col-5" type="file" onChange={handleAvatarChange}/>
                        </label>
                        <img className="row mb-4 mt-2" src={ avatar.length === 0 ? "/images/default-avatar.jpg" : URL.createObjectURL(avatar[0]) } width="200px" height="200px" />
                        <input type="submit" className="btn btn-outline-primary"/>
                    </form>
                    { showSpinner ? <div className="spinner-border m-4" role="status"></div> : null }
                </div>
            </div>
        </>

    )
}

export default Register;