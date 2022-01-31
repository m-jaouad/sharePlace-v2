import React, { useContext, useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";
import useHttpRequest from "../shared/hooks/http-hook";

import "./login.css";
import ModalError from "./ModalError";

const Login = (prpos) => {
  const [loginMode, setLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const { sendRequest, error, clearError } = useHttpRequest();

  console.log(error);

  const switchLoginMode = (props) => {
    setLoginMode((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loginMode) {
      const loginInfo = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      try {
        const resData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          loginInfo
        );
        console.log("resData: ", resData);
        auth.login(resData.token, resData.userId);
      } catch (err) {
        // console.log(err); // we have to do nothing, but let's at least log the error
      }
    } else {
      const loginInfo = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      try {
        const resData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          loginInfo
        );
        console.log(resData);
        auth.login(resData.token, resData.userId);
      } catch (err) {
        // console.log(err);
      }
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
          <h2 className="text-center">{loginMode ? "Login" : "Signin"} Page</h2>
          <Container className="mx-auto col-10">
            {!loginMode && (
              <InputGroup type="text" className="mb-3" hasValidation>
                <FloatingLabel className="col-12" label="name">
                  <FormControl
                    placeholder="name"
                    aria-label="name"
                    required
                    name="name"
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </InputGroup>
            )}
            <InputGroup type="email" className="mb-3" hasValidation>
              <FloatingLabel className="col-12" label="email">
                <FormControl
                  placeholder="email"
                  aria-label="email"
                  required
                  name="email"
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3" hasValidation type="password">
              <FloatingLabel className="col-12" label="password">
                <FormControl
                  placeholder="password"
                  aria-label="password"
                  type="password"
                  required
                  name="password"
                />
              </FloatingLabel>

              <Form.Control.Feedback type="invalid">
                Please enter a password
              </Form.Control.Feedback>
            </InputGroup>
            <Button
              variant="outline-primary"
              size="lg"
              className="col-12"
              type="submit"
            >
              {loginMode ? "Login" : "SignIn"}
            </Button>
            {loginMode && (
              <div className=".link">
                <Link to="/rest"> password forget ? </Link>
              </div>
            )}
            <Container>
              <Row>
                <Col className="col-5">
                  <hr />
                </Col>
                <Col className="text-center"> OR </Col>
                <Col className="col-5 ">
                  <hr />
                </Col>
              </Row>
            </Container>
            <div>
              <Button
                variant="outline-secondary"
                size="lg"
                className="col-12"
                onClick={switchLoginMode}
              >
                Switch to {loginMode ? "Signin" : "Login"}
              </Button>
            </div>
          </Container>
        </Container>
      </form>
    </React.Fragment>
  );
};

export default Login;
