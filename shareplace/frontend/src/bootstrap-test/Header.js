import { useContext } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthContext from "../shared/context/auth-context";
import useHttpRequest from "../shared/hooks/http-hook";

const Header = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttpRequest();
  const changeHandler = async (e) => {
    const pattern = e.target.value;
    try {
      const foundedUsers = await sendRequest(
        `http://localhost:5000/api/users/search/${pattern}`
      );
      console.log(foundedUsers);
    } catch (err) {}
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sending data to the server to be proccessed");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>SharePlace</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <LinkContainer to="/">
              <Nav.Link>Places</Nav.Link>
            </LinkContainer>
            {auth.isLoggedIn && (
              <LinkContainer to="/places/new-place">
                <Nav.Link>Add Place</Nav.Link>
              </LinkContainer>
            )}
            {auth.isLoggedIn && (
              <LinkContainer to={`/profil/${auth.userId}`}>
                <Nav.Link>Profil</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/test">
              <Nav.Link>Test</Nav.Link>
            </LinkContainer>
            {auth.isLoggedIn && <Button onClick={auth.logout}> Logout </Button>}
            {!auth.isLoggedIn && (
              <LinkContainer to="/auth">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          {auth.isLoggedIn && (
            <Form className="d-flex" onSubmit={submitHandler}>
              <FormControl
                type="search"
                placeholder="Find Freinds"
                className="me-2"
                aria-label="Search"
                onChange={changeHandler}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
