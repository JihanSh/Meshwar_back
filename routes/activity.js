import express from 'express';
import {
  createActivity,
  getAllActivities,
  getActivityById,
  editActivity,
  deleteActivity,
} from "../Controllers/activities.js";


const activity = express.Router();
activity.post('/create',createActivity);
activity.get("/all", getAllActivities);
activity.get("/:id", getActivityById);
activity.put("/:id", editActivity);
activity.delete("/:id", deleteActivity);


export default activity