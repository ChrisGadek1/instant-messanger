import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../redux/actions/userActions";

const Login = () => {

    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    const dispatcher = useDispatch();
    const user  = useSelector(store => store.user);

    useEffect(() => {
        if(user !== null && user.name !== undefined){
            navigate("/");
        }
    },[user])

    const handleLoginChange = (e) => setLogin(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSpinner(true)
        axios({
            method: "POST",
            url: '/login',
            data:{
                authenticity_token: document.querySelector("meta[name=csrf-token]") !== null ? document.querySelector("meta[name=csrf-token]").content : "",
                email: login,
                password
            },
            headers: {
                'Content-Type': 'application/json'}
        }).then(({data}) => {
            setLoginError("")
            setShowSpinner(false)
            dispatcher(addUser({
                name: data.user.name,
                surname: data.user.surname,
                username: data.user.username,
                email: data.user.email,
                avatar: data.avatar
            }))
            navigate("/");
        }).catch(e => {
            setShowSpinner(false)
            setLoginError("Sorry, that didn't work. Try again")
        })
    }

    return(
        <div className="card col-10 col-lg-4">
            <div className="card-body">
                <h5 className="card-title">Login</h5>
                <div className="p-4">
                    <form  onSubmit={handleSubmit}>
                        <label className="row mb-3">
                            Email
                            <input name="login" className="form-control" type="email" value={login} onChange={handleLoginChange}/>
                        </label>
                        <label className="row mb-3">
                            Password
                            <input name="login_password" className="form-control" type="password" value={password} onChange={handlePasswordChange}/>
                        </label>
                        <p className="small alert-danger" id="login-error-label">{loginError}</p>
                        <input type="submit" className="btn btn-outline-primary" value="Login"/>
                        { showSpinner ? <div className="spinner-border m-4" role="status"></div> : null }
                        <p>Don't have an account? Create it <Link to="/users/new">here</Link></p>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;