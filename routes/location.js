import express from "express";
import { upload } from "../middleware/upload.js";

import {
  createLocation,
  getAllLocations,
  getLocationById,
  editLocation,
  deleteLocation,
} from "../Controllers/location.js";

const Location = express.Router();
Location.post("/",  upload.array("images"),createLocation);
Location.get("/", getAllLocations);
Location.get("/:id", getLocationById);
Location.put("/:id", editLocation);
Location.delete("/:id", deleteLocation);

export default Location;
