import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "./places.css";
import place from "../images/place.png";
import { useContext, useState } from "react";
import AuthContext from "../shared/context/auth-context";
import Comment from "./Comment";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showComment, setShowComment] = useState(false);
  return (
    <Container className="places-container col-lg-5 col-md-8 col-mx-11 bg-light">
      <Card className=" places  mx-auto  ">
        <Card.Img className="card-img" variant="top" src={place} />
        <Card.Body>
          <Card.Title className="text-center">{props.name}</Card.Title>
          <Card.Text className="text-center">{props.description}</Card.Text>
          <Container className="  col-lg-8 mx-auto ">
            <Row>
              {auth.userId === props.creator && (
                <Col>
                  <Button variant="outline-warning" className="col-12">
                    Edit
                  </Button>
                </Col>
              )}
              <Col>
                <Button className="col-12" variant="outline-primary">
                  View
                </Button>
              </Col>
              {auth.userId === props.creator && (
                <Col>
                  <Button
                    variant="outline-danger"
                    className="col-12"
                    onClick={props.onDelete}
                  >
                    Delete
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
        </Card.Body>
        <hr />
        {auth.isLoggedIn && (
          <div>
            <div className="d-flex justify-content-center align-items-center  ">
              <Button
                className=" like-button"
                onClick={() => setShowComment((prev) => !prev)}
              >
                Comment
              </Button>
              <Button className=" like-button" variant="outline-primary">
                Like
              </Button>
            </div>
            {showComment && <Comment placeId={props.id} />}
          </div>
        )}
      </Card>
    </Container>
  );
};

export default PlaceItem;
