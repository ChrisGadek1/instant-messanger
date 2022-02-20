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
        setRepeatedPasswordError(validateRepeatPassword(repeatPassword));
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

        if(validateName(name, "name") === "" && validateName(surname, "surname") === "" && validatePassword(password) === "" && validateRepeatPassword(repeatPassword) === "" && emailError === "" && usernameError === ""){
            axios({
                method: "POST",
                url: "/users",
                data:{
                    name,
                    surname,
                    email,
                    password,
                    username,
                    authenticity_token: document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : ""
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(({data}) => {
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
                email
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
            <div className="card col-10 col-lg-4 p-4">
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
                        <input type="submit" className="btn btn-outline-primary"/>
                    </form>
                    { showSpinner ? <div className="spinner-border m-4" role="status"></div> : null }
                </div>
            </div>
        </>

    )
}

export default Register;