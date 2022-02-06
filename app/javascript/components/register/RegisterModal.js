import React from "react";
import {Button, Modal} from "react-bootstrap";

const RegisterModal = ({show, backToLogin, login}) => {
    return(
        <Modal centered={true} backdrop={"static"} show={show} keyboard={false}>
            <Modal.Header>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You have registered successfully. If you want you can login in to this account or get back to the login panel.</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-dark" data-bs-dismiss="modal" onClick={backToLogin}>Get Back</button>
                <button className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={login}>Login</button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterModal;