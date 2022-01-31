import Comment from "../models/Comment.js";

export default class CommentContrl {
  /**
   * get all commnet for a specific user on a specific place
   */
  static getAllComment = async (req, res, next) => {
    const { userId, placeId } = req.body;
    let commentData;
    try {
      commentData = await Comment.find({ userId, placeId });
    } catch (err) {
      return next(new Error("Could not fetch comment, Please try later"));
    }
    if (commentData.length === 0) {
      return next(new Error("No comment, be the first one who commented"));
    }
    res.status(200).json({ comments: commentData });
  };
  /** function to create a comment for a specific place by a user */

  static createComment = async (req, res, next) => {
    const { userId, placeId, content } = req.body;
    const newComment = new Comment({
      content,
      userId,
      placeId,
    });
    let createdCommnet;
    try {
      createdCommnet = await newComment.save();
    } catch (err) {
      console.log(err);
      return next(new Error("could not create comment"));
      c;
    }
    res.status(200).json({ createdCommnet });
  };

  /** get all comments for a specifc place */
  static getCommentsByPlace = async (req, res, next) => {
    const { placeId } = req.params;
    let comments = [];
    try {
      comments = await Comment.find({ placeId }).populate("userId", "name");
    } catch (err) {
      return next(new Error("something went wrong, Please try later"));
    }
    if (comments.length === 0) {
      return next(new Error("No comment, be the first one who commented"));
    }
    res.status(200).json({ comments });
  };
}
