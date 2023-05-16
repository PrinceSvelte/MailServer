import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Example({ handleShowModal, showModal }) {
  const [no, setNo] = useState(false);
  const handleNoClick = () => {
    setNo(true);
  };

  const handleAnswer = () => {
    handleShowModal();
  };

  return (
    <>
      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: "30%",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            Do you have Antivirus Installed In Your System?
          </Modal.Title>
        </Modal.Header>
        {no ? (
          <Modal.Body style={{ color: "red" }}>
            {" "}
            You can't proceed further without antivirus!{" "}
          </Modal.Body>
        ) : (
          <Modal.Body style={{ color: "red" }}>
            Please Don't provide wrong information.
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNoClick}>
            No
          </Button>
          <Button onClick={() => handleAnswer()} variant="primary">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Example;
