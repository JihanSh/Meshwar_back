import express from "express";
import controller from "../Controllers/feedback.js";
import { upload } from "../middleware/upload.js";

const feedbacks = express.Router();

feedbacks.get("/place/:id", controller.get);
feedbacks.post("/:id", upload.array("feedImages"), controller.post);
feedbacks.get("/", controller.getAll);
feedbacks.get("/:id", controller.get);
feedbacks.put("/:id", controller.put);
// feedbacks.delete("/:id", controller.delete);
// feedbacks.get("/pag", controller.getPagination);
// feedbacks.get("/list/:id", controller.getPlacebyActivity);

export default feedbacks;
