import React, {useState} from "react";

const Register = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleNameChange = (e) => setName(e.target.value);
    const handleSurnameChange = (e) => setSurname(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRepeatPasswordChange = (e) => setRepeatPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    return(
        <div className="card col-10 col-lg-4 p-4">
            <h5 className="card-title">Register</h5>
            <div className="card-body">
                <form>
                    <label className="row mb-3">
                        Name
                        <input className="form-control" type="text" value={name} onChange={handleNameChange}/>
                    </label>
                    <label className="row mb-3">
                        Surname
                        <input className="form-control" type="text" value={surname} onChange={handleSurnameChange}/>
                    </label>
                    <label className="row mb-3">
                        Username
                        <input className="form-control" type="text" value={username} onChange={handleUsernameChange}/>
                    </label>
                    <label className="row mb-3">
                        Email
                        <input className="form-control" type="email" value={email} onChange={handleEmailChange}/>
                    </label>
                    <label className="row mb-3">
                        Password
                        <input className="form-control" type="password" value={password} onChange={handlePasswordChange}/>
                    </label>
                    <label className="row mb-3">
                        Repeat Password
                        <input className="form-control" type="password" value={repeatPassword} onChange={handleRepeatPasswordChange}/>
                    </label>
                    <input type="submit" className="btn btn-outline-primary"/>
                </form>
            </div>



        </div>
    )
}

export default Register;