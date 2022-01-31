import { Modal, Button } from "react-bootstrap";

const ModalError = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.title ? props.title : "An Error has occured"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.error}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.onSave}>
          {props.action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
