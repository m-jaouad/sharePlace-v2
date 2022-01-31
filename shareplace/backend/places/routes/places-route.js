import express from "express";
import PlaceContrl from "../controllers/places-controller.js";

const route = express.Router();

route.post("/", PlaceContrl.apiCreatePlace);
route.get("/:id", PlaceContrl.apiGetPlaceUser);
route.get("/", PlaceContrl.apiGetAllPlaces);
route.delete("/:id", PlaceContrl.apiDeletePlaceById);
route.patch("/:id", PlaceContrl.apiUpdatePlace);
route.get("/user/:id", PlaceContrl.apiGetPlacesOfUser);
export default route;
