import express from "express";

import LikeContrl from "../controllers/likes-contoller.js";

const route = express.Router();

route.post("/", LikeContrl.createLike);
route.get("/:placeId", LikeContrl.getAllLikesByPlace);

export default route;
