import express from "express";
import controller from "../Controllers/places.js";
import { upload } from "../middleware/upload.js";

const places = express.Router();

places.post("/", upload.array("images"), controller.post);
places.get("/", controller.getAll);
places.get("/random", controller.getRandomPlace);
places.get("/:id", controller.get);
places.put("/:id", upload.array("images"), controller.put);
places.delete("/:id", controller.delete);
places.get("/pag", controller.getPagination);
places.get(
  "/list/:activity/:location",
  controller.getPlacebyActivityandLocation
);
places.get("/list/:location", controller.getPlacebyLocation);
places.get("/showByActivity/:activity", controller.getPlacebyActivity);
places.get("/show/:id", controller.getFeedbackofPlace);

export default places;
