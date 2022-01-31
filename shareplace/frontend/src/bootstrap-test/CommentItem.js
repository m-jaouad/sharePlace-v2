const CommentItem = (props) => {
  return (
    <div className="">
      <div className="name-person"> {props.name} </div>
      <div> {props.content} </div>
      <div className="comment-date"> {props.datePub} </div>
      <hr />
    </div>
  );
};

export default CommentItem;
