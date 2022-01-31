import express from "express";
import UserContrl from "../controllers/users-controller.js";

const route = express.Router();

route.get("/", UserContrl.getAllUsers);
route.get("/:id", UserContrl.getUserById);
route.post("/signup", UserContrl.signup);
route.post("/login", UserContrl.login);
route.delete("/:id", UserContrl.deleteUser);
route.patch("/:id", UserContrl.resetPassword);
route.get("/search/:pattern", UserContrl.searchUserByName);

export default route;
