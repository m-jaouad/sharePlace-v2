import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../shared/context/auth-context";
import useHttpRequest from "../shared/hooks/http-hook";
import CommentItem from "./CommentItem";
import ModalError from "./ModalError";

const Comment = (props) => {
  const { sendRequest, error, clearError } = useHttpRequest();
  const auth = useContext(AuthContext);
  const [comments, setCommets] = useState([]);
  const [content, setContent] = useState("");

  const contentRef = useRef();

  const inputChnageHandler = (e) => {
    const content = contentRef.current.value;
    setContent(content);
  };

  const getAllComment = useCallback(async () => {
    try {
      const placeComments = await sendRequest(
        `http://localhost:5000/api/comments/${props.placeId}`
      );
      console.log(" place comments:", placeComments.comments);
      setCommets(placeComments.comments);
    } catch (err) {
      console.log(err);
    }
  }, [sendRequest, props.placeId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const comment = {
      content: e.target.content.value,
      userId: auth.userId,
      placeId: props.placeId,
    };
    console.log(comment);
    try {
      await sendRequest("http://localhost:5000/api/comments", "Post", comment);
      setContent("");
      getAllComment();
    } catch (err) {}
  };

  useEffect(() => {
    getAllComment();
  }, [props.id, sendRequest, props.placeId, getAllComment]);

  return (
    <div>
      <ModalError
        title={"oopps !!"}
        show={error}
        onClose={clearError}
        onHide={clearError}
        error={error}
      />
      <form
        className="d-flex align-items-center  justify-content-center col-10 mx-auto m-1"
        onSubmit={submitHandler}
      >
        <input
          className="form-control"
          placeholder="leave a comment here"
          required
          name="content"
          value={content}
          onChange={inputChnageHandler}
          ref={contentRef}
        />
        <Button variant="outline-warning" type="submit" className="p-1 m-1">
          Post
        </Button>
      </form>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            content={comment.content}
            datePub={comment.datePub}
            name={comment.userId.name}
          />
        );
      })}
    </div>
  );
};

export default Comment;
