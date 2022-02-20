import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const UserDetails = () => {

    const user = useSelector(store => store.user);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleNameChange = (e) => setName(e.target.value);
    const handleSurnameChange = (e) => setSurname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);

    const handleSubmitNameChange = (e) => {
        e.preventDefault();
    }

    const handleSubmitSurnameChange = (e) => {
        e.preventDefault();
    }

    const handleSubmitUsernameChange = (e) => {
        e.preventDefault();
    }

    const handleSubmitEmailChange = (e) => {
        e.preventDefault();
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

    return(
        <Card className="col-lg-6 col-sm-10">
            <Card.Header>
                <Card.Title>My Account</Card.Title>
            </Card.Header>
            <Card.Body>
                <form className="mb-5" onSubmit={handleSubmitNameChange}>
                    <label>
                        Name
                        <input className="form-control col-5 m-1" type="text" value={name} onChange={handleNameChange}/>
                    </label>
                    <input type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                </form>

                <form className="mb-5" onSubmit={handleSubmitSurnameChange}>
                    <label>
                        Surname
                        <input className="form-control col-5" type="text" value={surname} onChange={handleSurnameChange}/>
                    </label>
                    <input type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                </form>
                <form className="mb-5" onSubmit={handleSubmitUsernameChange}>
                    <label>
                        username
                        <input className="form-control col-5" type="text" value={username} onChange={handleUsernameChange}/>
                    </label>
                    <input type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                </form>
                <form className="mb-5" onSubmit={handleSubmitEmailChange}>
                    <label>
                        email
                        <input className="form-control col-5" type="email" value={email} onChange={handleEmailChange}/>
                    </label>
                    <input type="submit" className="btn btn-outline-primary ms-2" value="Edit"/>
                </form>
            </Card.Body>
        </Card>
    )
}

export default UserDetails;