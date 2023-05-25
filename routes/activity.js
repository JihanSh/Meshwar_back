import express from 'express';
import {
  createActivity,
  getAllActivities,
  getActivityById,
  editActivity,
  deleteActivity,
} from "../Controllers/activities.js";
import { upload } from "../middleware/upload.js";


const activity = express.Router();
activity.post('/',upload.array("images"),createActivity);
activity.get("/", getAllActivities);
activity.get("/:id", getActivityById);
activity.put("/:id", editActivity);
activity.delete("/:id", deleteActivity);


export default activity