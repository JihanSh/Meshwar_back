import express from "express";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  editLocation,
  deleteLocation,
} from "../Controllers/location.js";

const Location = express.Router();
Location.post("/", createLocation);
Location.get("/", getAllLocations);
Location.get("/:id", getLocationById);
Location.put("/:id", editLocation);
Location.delete("/:id", deleteLocation);

export default Location;
