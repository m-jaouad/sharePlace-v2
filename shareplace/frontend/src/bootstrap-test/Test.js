import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Test.module.css";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Test = (props) => {
  const [show, setShow] = useState(true);

  const closeHandler = () => {
    setShow(false);
  };

  const openHandler = () => {
    setShow(true);
  };
  return (
    <Container fluid className={`bg-light  ${classes.test} `}>
      <div className="col-8 mx-auto">
        {show && (
          <Alert variant="danger" onClose={closeHandler} dismissible>
            <Alert.Heading> an error occuring </Alert.Heading>
            <p> Please try again </p>
          </Alert>
        )}
        {!show && (
          <Button variant="outline-primary" onClick={openHandler}>
            OPEN Alert
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Test;
