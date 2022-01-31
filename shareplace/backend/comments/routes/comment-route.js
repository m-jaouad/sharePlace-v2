import express from "express";

import CommentContrl from "../controllers/Comment-controller.js";

const route = express.Router();

route.get("/:placeId", CommentContrl.getCommentsByPlace);
route.post("/comments", CommentContrl.getAllComment);
route.post("/", CommentContrl.createComment);

export default route;
