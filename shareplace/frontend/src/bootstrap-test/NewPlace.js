import React, { useContext } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import AuthContext from "../shared/context/auth-context";
import useHttpRequest from "../shared/hooks/http-hook";
import ModalError from "./ModalError";
import { useHistory } from "react-router-dom";

const NewPlace = (props) => {
  const { error, sendRequest, clearError } = useHttpRequest();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const placeData = {
      name: e.target.name.value,
      address: e.target.address.value,
      description: e.target.description.value,
      creator: auth.userId,
      image: "the url of the image there",
    };
    console.log(placeData);
    try {
      const res = await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        placeData
      );
      history.push("/");
      console.log(res);
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <React.Fragment>
      <ModalError
        show={error}
        onClose={clearError}
        onHide={clearError}
        error={error}
      />
      <form onSubmit={submitHandler}>
        <Container className="container-login bg-light col-lg-5 col-sm-10 col-md-6">
          <h2 className="text-center"> share a place with the community</h2>
          <Container className="mx-auto col-10">
            <InputGroup type="text" className="mb-3" hasValidation>
              <FloatingLabel className="col-12" label="place Name">
                <FormControl
                  placeholder="place Name"
                  aria-label="placeName"
                  name="name"
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Please enter the place name
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3" hasValidation type="text">
              <FloatingLabel className="col-12" label="address">
                <FormControl
                  placeholder="the place's adress"
                  aria-label="placeAddress"
                  type="text"
                  name="address"
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Please enter the palce's address
              </Form.Control.Feedback>
            </InputGroup>

            <FloatingLabel
              controlId="floatingTextarea2"
              label="PLace Description"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a the palce description here"
                style={{ height: "200px" }}
                name="description"
              />
            </FloatingLabel>
            <Button
              variant="outline-primary"
              size="lg"
              type="submit"
              className="col-12 mt-2"
            >
              SHARE
            </Button>
          </Container>
        </Container>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
