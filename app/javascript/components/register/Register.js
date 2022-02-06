import React, {useState} from "react";
import axios from "axios";
import RegisterModal from "./RegisterModal";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

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

    const validate = (value, name) => {
        let letterNumber = /^[0-9a-zA-Z]+$/;
        if(value.length < 2){
            return `${name} must be longer than 1 character`
        }
        else if(value.length > 100){
            return `${name} must be shorter than 100 characters`
        }
        else if(name !== "password" && name !== "email" && !value.match(letterNumber)){
            return `${name} must contain only digits and numbers`
        }
        return ""
    }

    const validateEmail = (value, name) => {
        let result = validate(value, "email");
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!value.toLowerCase().match(emailRegex)){
            result = `This is not a correct email`
        }
        return result;
    }

    const validatePassword = (value) => {
        let result = validate(value, "password");
        if(value.length < 8){
            result = "password must be longer than 7 characters";
        }
        return result;
    }

    const validateRepeatPassword = (repeatPassword) => {
        if(password !== repeatPassword){
            return "repeated password isn't equal to the password"
        }
        return ""
    }

    const getIsTakenError = (value, name, url, testData) => {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                url: url,
                data:{
                    value: value,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(({data}) => {
                if(data[testData]){
                    resolve(`This ${name} is already taken`)
                }
                else{
                    resolve("");
                }
            }).catch(e => {
                console.error(e)
                reject("there was an error with connection")
            })
        })
    }

    const validateFromApi = async (value, name, url, testData, isEmail) => {
        return new Promise((resolve) => {
            let result = "";
            result = validate(value, name)
            if(isEmail && result === ""){
                result = validateEmail(value, name)
            }
            if(result === ""){
                result = getIsTakenError(value, name, url, testData);
            }
            resolve(result)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowSpinner(true);
        setNameError(validate(name, "name"));
        setSurnameError(validate(surname, "surname"));
        setPasswordError(validatePassword(password));
        setRepeatedPasswordError(validateRepeatPassword(repeatPassword));
        let emailError = ""
        try{
            emailError = await validateFromApi(email, "email", "/users/get_by_email", "isTaken", true);
            setEmailError(emailError);
        }
        catch (e){
            setEmailError(e);
        }
        let usernameError = ""
        try{
            usernameError = await validateFromApi(username, "username", "/users/get_by_username", "isTaken", false)
            setUsernameError(usernameError);
        }
        catch (e){
            setUsernameError(e);
        }

        if(validate(name, "name") === "" && validate(surname, "surname") === "" && validatePassword(password) === "" && validateRepeatPassword(repeatPassword) === "" && emailError === "" && usernameError === ""){
            axios({
                method: "POST",
                url: "/users",
                data:{
                    name,
                    surname,
                    email,
                    password,
                    username
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

    }

    const backToLogin = () => {
        setShowDialog(false)
        navigate("/login")
    }

    const login = () => {
        setShowDialog(false)
    }

    return(
        <>
            <RegisterModal show={showDialog} login={login} backToLogin={backToLogin} />
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