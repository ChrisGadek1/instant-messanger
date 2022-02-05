import React, {useState} from "react";
import axios from "axios";

const Register = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");

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
        if(value.length < 2){
            return `${name} must be longer than 1 character`
        }
        else if(value.length > 100){
            return `${name} Name must be shorter than 100 characters`
        }
        return ""
    }

    const validatePassword = (value) => {
        let result = validate(value, "password");
        if(value.length < 8){
            result = "must be longer than 8 characters";
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
                reject("there was an error with connection")
            })
        })
    }

    const validateFromApi = async (value, name, url, testData) => {
        return new Promise((resolve) => {
            let result = validate(value, name)
            if(result === ""){
                result = getIsTakenError(value, name, url, testData);
            }
            resolve(result)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError(validate(name, "name"));
        setSurnameError(validate(surname, "surname"));
        setPasswordError(validatePassword(password));
        setRepeatedPasswordError(validateRepeatPassword(repeatPassword));
        try{
            setEmailError(await validateFromApi(email, "email", "/users/get_by_email", "isTaken"));
        }
        catch (e){
            setEmailError(e);
        }
        try{
            setUsernameError(await validateFromApi(username, "username", "/users/get_by_username", "isTaken"));
        }
        catch (e){
            setUsernameError(e);
        }

    }

    return(
        <div className="card col-10 col-lg-4 p-4">
            <h5 className="card-title">Register</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <label className="row mb-3">
                        Name
                        <input className="form-control" type="text" value={name} onChange={handleNameChange}/>
                        <p className="small alert-danger">{nameError}</p>
                    </label>
                    <label className="row mb-3">
                        Surname
                        <input className="form-control" type="text" value={surname} onChange={handleSurnameChange}/>
                        <p className="small alert-danger">{surnameError}</p>
                    </label>
                    <label className="row mb-3">
                        Username
                        <input className="form-control" type="text" value={username} onChange={handleUsernameChange}/>
                        <p className="small alert-danger">{usernameError}</p>
                    </label>
                    <label className="row mb-3">
                        Email
                        <input className="form-control" type="email" value={email} onChange={handleEmailChange}/>
                        <p className="small alert-danger">{emailError}</p>
                    </label>
                    <label className="row mb-3">
                        Password
                        <input className="form-control" type="password" value={password} onChange={handlePasswordChange}/>
                        <p className="small alert-danger">{passwordError}</p>
                    </label>
                    <label className="row mb-3">
                        Repeat Password
                        <input className="form-control" type="password" value={repeatPassword} onChange={handleRepeatPasswordChange}/>
                        <p className="small alert-danger">{repeatedPasswordError}</p>
                    </label>
                    <input type="submit" className="btn btn-outline-primary"/>
                </form>
            </div>



        </div>
    )
}

export default Register;