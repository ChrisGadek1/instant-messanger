import React from "react";
import {Modal} from "react-bootstrap";

const ErrorModal = ({error, click, show}) => {
    return(
        <Modal centered={true}  show={show}>
            <Modal.Header>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{error}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-primary" data-bs-dismiss="modal" onClick={click}>OK</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal;