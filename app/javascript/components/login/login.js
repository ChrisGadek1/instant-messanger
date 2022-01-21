import React, {useState} from "react";

const Login = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginChange = (e) => setLogin(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }

    return(
        <div className="card col-10 col-lg-4">
            <div className="card-body">
                <h5 className="card-title">Login</h5>
                <div className="p-4">
                    <form  onSubmit={handleSubmit}>
                        <label className="row mb-3">
                            Email
                            <input className="form-control" type="email" value={login} onChange={handleLoginChange}/>
                        </label>
                        <label className="row mb-3">
                            Password
                            <input className="form-control" type="password" value={password} onChange={handlePasswordChange}/>
                        </label>
                        <input type="submit" className="btn btn-outline-primary" value="Login"/>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;